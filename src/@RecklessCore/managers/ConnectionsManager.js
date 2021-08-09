/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */

import PropTypes from 'prop-types';

import React, {
  useRef, useEffect, createContext, useState, useMemo, useCallback,
} from 'react';

import { v4 as uuidv4 } from 'uuid';

import { joinRoom, selfId } from 'trystero';
import useAppContext from '../contexts/useAppContext';
import usePeersContext from '../contexts/usePeersContext';

import generateRoomId from '../utils/generateRoomId';
import { restoreData, persistData } from '../PersistantStorage';

import EventsManager from './EventsManager';
import { isHost } from '../utils/userCheck';

export const ConnectionsContext = createContext(null);
// eslint-disable-next-line import/no-mutable-exports
export let connectionsContextValue = {};

const ConnectionsManager = ({ children }) => {
  const { subscribe, publish, setSceneJSON } = useAppContext();

  const { findPeer } = usePeersContext();

  const [events] = useState(() => EventsManager());

  const [connectionType] = useState((isHost()) ? 'host' : 'peer');

  const [room, setRoom] = useState(null);
  const [roomInfo, setRoomInfo] = useState(null);

  // Pull from local storage
  const me = restoreData('me');

  const [ConnectionRegistry] = useState(() => new Map());

  const isMounted = useRef(false);

  const getMe = useCallback(
    () => Array.from(ConnectionRegistry.keys())
      .map((id) => ConnectionRegistry.get(id)).filter((p) => p.isMe === true)[0],
    [ConnectionRegistry],
  );

  const getHost = useCallback(
    () => Array.from(ConnectionRegistry.keys())
      .map((id) => ConnectionRegistry.get(id)).filter((p) => p.isHost === true)[0],
    [ConnectionRegistry],
  );

  const getByUUID = useCallback(
    (uuid) => Array.from(ConnectionRegistry.keys())
      .map((id) => ConnectionRegistry.get(id)).filter((p) => p.uuid === uuid)[0],
    [ConnectionRegistry],
  );

  const updateConnectionInfo = useCallback((uuid, ref) => {
    let oldRefs = {};

    if (ConnectionRegistry.has(ref.connectionId)) {
      oldRefs = {
        ...oldRefs,
        ...ConnectionRegistry.get(ref.connectionId),
      };
      ConnectionRegistry.delete(ref.connectionId);
    }

    if (ConnectionRegistry.has(uuid)) {
      oldRefs = {
        ...oldRefs,
        ...ConnectionRegistry.get(uuid),
      };
      ConnectionRegistry.delete(uuid);
    }

    const newRef = { ...oldRefs, ...ref };

    ConnectionRegistry.set(uuid, newRef);
    // addPeer(uuid, newRef);

    if (newRef.isMe) {
      persistData('me', newRef);
      publish('me-modified', newRef);
    }

    if (newRef.isHost) {
      publish('host-modified', newRef);
    }

    persistData('connections', Array.from(ConnectionRegistry));
    publish('connection-modified', newRef);
  }, [ConnectionRegistry, publish]);

  const findConnection = useCallback((id) => ConnectionRegistry.get(id), [ConnectionRegistry]);

  const registerConnection = useCallback((identifier, ref) => {
    // register by id
    ConnectionRegistry.set(identifier, ref);

    if (ref.isMe) {
      persistData('me', ref);
      publish('me-modified', ref);
    }

    if (ref.isHost) {
      publish('host-modified', ref);
    }

    persistData('connections', Array.from(ConnectionRegistry));

    publish('connections-list-changed', 'add');
    publish('connection-modified', ref);
  }, [ConnectionRegistry, publish]);

  const unregisterConnection = useCallback((identifier) => {
    // unregister by id
    ConnectionRegistry.delete(identifier);
    publish('connections-list-changed', 'remove');
  }, [ConnectionRegistry, publish]);

  const getConnectionsArray = useCallback(
    () => Array.from(ConnectionRegistry.keys())
      .map((id) => ConnectionRegistry.get(id)),
    [ConnectionRegistry],
  );

  const getRoomInfo = useCallback(() => roomInfo, [roomInfo]);

  const connectionRegistryUtils = useMemo(
    () => ({
      updateConnectionInfo,
      findConnection,
      registerConnection,
      unregisterConnection,
      getConnectionsArray,
      getRoomInfo,
      getMe,
      getHost,
      getByUUID,
    }),
    [
      updateConnectionInfo,
      findConnection,
      getConnectionsArray,
      registerConnection,
      unregisterConnection,
      getRoomInfo,
      getMe,
      getHost,
      getByUUID,
    ],
  );

  // Store props for context provider
  connectionsContextValue = useMemo(() => ({
    ConnectionRegistry,
    ...connectionRegistryUtils,
    connectionType,
    room,
    setRoom,
    roomInfo,
    setRoomInfo,
  }), [
    ConnectionRegistry,
    connectionRegistryUtils,
    connectionType,
    room, setRoom,
    roomInfo, setRoomInfo,
  ]);

  // Find, create, and save details abount a room
  useEffect(() => {
    if (roomInfo === null) { // There is no roomInfo, create it
      let info = restoreData('roomInfo');

      if (info === null) { // There is no stored state, make it up
        if (isHost()) { // If there is no connection url, you're the host
          info = {
            id: generateRoomId(),
          };
        } else {
          info = {
            id: window.location.hash.substr(1),
          };
        }
      }

      // Save / pass down room info
      persistData('roomInfo', info);
      setRoomInfo(info);
    }
  }, [roomInfo, setRoomInfo]);

  // Save roomInfo updates to localstorage
  useEffect(() => {
    if (roomInfo !== null) {
      persistData('roomInfo', roomInfo);
      publish('room-modified', roomInfo);
    }
  }, [roomInfo, publish]);

  // Create peer to peer room
  useEffect(() => {
    if (room === null && roomInfo !== null) {
      setRoom(joinRoom({ appId: `Reckless Technology room ${roomInfo.id}` }, roomInfo.id));
    }
  }, [setRoom, room, roomInfo]);

  // Create ref to access me props
  const meRef = useMemo(() => ({
    status: 'connected',
    connectionId: selfId,
    uuid: me !== null ? me.uuid : uuidv4(),
    name: me !== null ? me.name : `new ${connectionType}`,
    isMe: true,
    isHost: (connectionType === 'host'),
    mode: 'view',
    lastSeen: Date.now(),
  }), [me, connectionType]);

  const pingMe = useCallback(() => {
    // if (room !== null) {
    //   console.log(`took ${room.ping(meRef.connectionId)}ms`);
    // }
  }, []);

  useEffect(() => {
    if (room !== null) {
      const [sendAnnounce, getAnnounce] = room.makeAction('announce');
      const [sendData, getData] = room.makeAction('scene');

      // If someone connects to host
      const connectionJoin = (id) => {
        // Create ref to access connection props
        const connectionRef = {
          status: 'connected',
          connectionId: id,
          name: 'new connection',
          isMe: false,
          isHost: false,
          mode: 'view',
          lastSeen: Date.now(),
        };

        // Add to connection registry
        registerConnection(id, {
          ...connectionRef,
          getData,
          sendData,
          getAnnounce,
          sendAnnounce,
          ping: pingMe,
        });

        // Send your info to connected peers
        sendAnnounce({
          connectionId: meRef.connectionId,
          uuid: meRef.uuid,
          name: meRef.name,
          isHost: meRef.isHost,
        });
      };

      room.onPeerJoin((id) => connectionJoin(id));

      // Add me to registry
      registerConnection(meRef.uuid, {
        ...meRef,
        getData,
        sendData,
        getAnnounce,
        sendAnnounce,
        ping: pingMe,
      });

      // Remove connection from registry if they leave the room
      room.onPeerLeave((id) => unregisterConnection(id));

      // Listen for commands
      getData((data) => {
        const peer = findPeer(data.uuid);
        switch (data.type) {
          default:
            if (peer !== undefined && typeof peer.setData === 'function') {
              peer.setData(data.payload);
            }
            break;
          case 'shareScene':
            setSceneJSON(data.payload);
            publish('scene-changed', data.payload);
            break;
        }
      });

      // Listen for info about connection
      getAnnounce(({
        connectionId, uuid, name, isHost: host,
      }) => {
        updateConnectionInfo(uuid, {
          connectionId, host, uuid, name, lastSeen: Date.now(),
        });
      });
    }
  }, [
    events.subscribe,
    events.unsubscribe,
    meRef,
    pingMe,
    publish,
    registerConnection,
    room,
    setSceneJSON,
    unregisterConnection,
    findConnection,
    updateConnectionInfo,
    findPeer,
  ]);

  // send updates to connections
  const announceMeChanges = useCallback((connection) => {
    if (isMounted.current && connection !== undefined) {
      if (connection.isMe) {
        if (typeof connection.sendAnnounce === 'function') {
          connection.sendAnnounce({
            connectionId: connection.connectionId,
            uuid: connection.uuid,
            name: connection.name,
            isHost: connection.isHost,
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (meRef !== undefined) {
      isMounted.current = true;
      subscribe('me-modified', announceMeChanges);
    }
    return () => {
      isMounted.current = false;
    };
  }, [subscribe, announceMeChanges, meRef]);

  return (
    <ConnectionsContext.Provider value={connectionsContextValue}>
      {children}
    </ConnectionsContext.Provider>
  );
};

ConnectionsManager.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default ConnectionsManager;
