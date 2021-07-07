import { useEffect, createContext, useState, useMemo, useCallback } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { joinRoom, selfId } from 'trystero';
import useAppContext from '../contexts/useAppContext';
import usePeersContext from '../contexts/usePeersContext';

import generateRoomId from '../utils/generateRoomId';
import { restoreData, persistData } from '../PersistantStorage';

export const ConnectionsContext = createContext(null);
export let connectionsContextValue = {};

export default function ConnectionsManager({ children }) {
  const { subscribe, publish, setSceneJSON } = useAppContext();
  const { findPeer, registerPeer, unregisterPeer, updatePeerInfo } = usePeersContext();
  
  const [ connectionType ] = useState(window.location.hash.substr(1) === '' ? 'host' : 'peer');

  const [ room, setRoom ] = useState(null);
  const [ roomInfo, setRoomInfo ] = useState(null);
  
  let roomActions = {};

  // Pull from local storage
  const me = restoreData('me');

  // Store props for context provider
  connectionsContextValue = useMemo(() => ({
    connectionType,
    room, setRoom,
    roomInfo, setRoomInfo,
  }), [
    connectionType,
    room, setRoom,
    roomInfo, setRoomInfo,
  ]);

  // Find, create, and save details abount a room
  useEffect(()=>{
    // There is no roomInfo, create it
    if (roomInfo === null) {
      let info = null;
      
      const isHost = (window.location.hash.substr(1) === '');
      // If there is no connection url, you're the host
      if (isHost) {
        const hostInfo = restoreData('roomInfo');
        
        if (hostInfo === null) {
          // There is no stored state, make it up
          info = {
            id: generateRoomId()
          };
        } else {
          info = hostInfo;
        }
      } else {
        const peerInfo = restoreData('roomInfo');
        
        if (peerInfo === null) {
          // There is no stored state, make it up
          info = {
            id: window.location.hash.substr(1)
          };
        } else {
          info = peerInfo;
        }
      }

      // Save / pass down room info
      persistData('roomInfo', info);
      setRoomInfo(info);
    }
  }, [roomInfo, setRoomInfo])

  // Save roomInfo updates to localstorage
  useEffect(() => {
    if (roomInfo !== null) {
      persistData('roomInfo', roomInfo);
    }
  }, [roomInfo]);

  // Create peer to peer room
  useEffect(()=>{
    if (room === null && roomInfo !== null) {
        setRoom(joinRoom({appId: `Reckless Technology room ${roomInfo.id}`}, roomInfo.id));
    }
  }, [setRoom, room, roomInfo])

  // Create ref to access me props
  const meRef = useMemo(() => ({
    status: 'connected',
    peerId: selfId,
    uuid: me !== null ? me.uuid : uuidv4(),
    name: me !== null ? me.name : `new ${connectionType}`,
    isMe: true,
    isHost: (connectionType === 'host'),
    mode: 'view',
    lastSeen: Date.now(),
  }), [me, connectionType]);

  const pingMe = useCallback(()=>{
    if (room !== null) {
      console.log(`took ${room.ping(meRef.peerId)}ms`)
    }
  }, [room, meRef]);

  useEffect(()=>{
    if (room !== null) {
      const [ sendAnnounce, getAnnounce ] = room.makeAction('announce');
      const [ sendData, restoreData ] = room.makeAction('scene');

      // If someone connects to host
      const peerJoin = (id)=>{
        // Create ref to access peer props
        const peerRef = {
          status: 'connected',
          peerId: id,
          name: 'new peer',
          isMe: false,
          isHost: false,
          mode: 'view',
          lastSeen: Date.now(),
        };
          
        // Add to peer registry
        registerPeer(id, {
          ...peerRef,
          restoreData, sendData,
          getAnnounce, sendAnnounce,
          ping: pingMe,
        });
        
        // Send your info to connected peers
        sendAnnounce({
          peerId: meRef.peerId,
          uuid: meRef.uuid, 
          name: meRef.name,
          isHost: meRef.isHost
        })
      };
      room.onPeerJoin(id => peerJoin(id));

      // Add me to registry
      registerPeer(selfId, {
        ...meRef,
        restoreData, sendData,
        getAnnounce, sendAnnounce,
        ping: pingMe,
      });
  
      // Remove peer from registry if they leave the room
      room.onPeerLeave(id => unregisterPeer(id));
      
      // Listen for commands
      restoreData((data)=>{
        if (data.type === 'shareScene') {
          setSceneJSON(data.payload);
          publish('scene-changed', data.payload);
        } else {
          console.log('data', data);
        }
      })

      // Listen for info about peer
      getAnnounce(({peerId, uuid, name, isHost})=>{
        updatePeerInfo(peerId, { isHost: isHost, uuid: uuid, name: name, lastSeen: Date.now() });
      });
    }
  }, [room, connectionType, publish, setSceneJSON, registerPeer, unregisterPeer, me, updatePeerInfo, findPeer, meRef, pingMe])

  // send updates to peers
  const announceMeChanges = useCallback((peer)=>{
    if (peer !== undefined) {
      if (peer.isMe) {
        if (typeof peer.sendAnnounce === 'function') {
          peer.sendAnnounce({
            peerId: peer.peerId,
            uuid: peer.uuid, 
            name: peer.name,
            isHost: peer.isHost
          });
        }
      }
    }
  }, [])
  useMemo(()=>subscribe('me-modified', announceMeChanges), [subscribe, announceMeChanges]);

  return (<ConnectionsContext.Provider value={connectionsContextValue}>{children}</ConnectionsContext.Provider>)
}
