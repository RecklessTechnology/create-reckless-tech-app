import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import moment from 'moment';

import useAppContext from '../contexts/useAppContext';
import { persistData, restoreData } from '../PersistantStorage';

export const PeersContext = createContext(null);
export let peersContextValue = {};

const peers = restoreData('peers');

const PeersManager = ({
    children
}) => {
  const { publish, addPeer, removePeer } = useAppContext();

    // Peer Connections
  const [PeerRegistry] = useState(() => new Map(peers));
  
  const getMe = useCallback(() => {
    return Array.from(PeerRegistry.keys()).map((id)=>PeerRegistry.get(id)).filter((p)=>p.isMe===true)[0]
  }, [PeerRegistry]);

  const getHost = useCallback(() => {
    return Array.from(PeerRegistry.keys()).map((id)=>PeerRegistry.get(id)).filter((p)=>p.isHost===true)[0]
  }, [PeerRegistry]);

  const getByUUID = useCallback((uuid) => {
    return Array.from(PeerRegistry.keys()).map((id)=>PeerRegistry.get(id)).filter((p)=>p.uuid===uuid)[0]
  }, [PeerRegistry]);

  const updatePeerInfo = useCallback((identifier, ref) => {
    let oldRef = getByUUID(ref.uuid);
    if (oldRef === undefined) {
      oldRef = PeerRegistry.get(identifier);
    }
    const newRef = { ...oldRef, ...ref };
    
    PeerRegistry.set(identifier, newRef);

    removePeer(identifier);
    addPeer(identifier, newRef);

    if (newRef.isMe) {
      persistData('me', newRef)
      publish('me-modified', newRef);
    }

    if (newRef.isHost) {
      publish('host-modified', newRef);
    }
    
    persistData('peers', Array.from(PeerRegistry));
    publish('peer-modified', newRef);

  }, [PeerRegistry, publish, addPeer, removePeer, getByUUID]);

  const findPeer = useCallback((id) => {
    return PeerRegistry.get(id);
  },[PeerRegistry]);

  const registerPeer = useCallback((identifier, ref) => {
      if (PeerRegistry.get(identifier)) { /*updatePeerInfo(identifier, ref);*/ return null; }

      let newRef = ref;
      if (ref.uuid) {
        const oldRef = getByUUID(ref.uuid);
        if (oldRef !== undefined) {
          newRef = {
            ...oldRef,
            ...ref, 
          };
          PeerRegistry.delete(oldRef.peerId)
        }
      }

      // register by id
      PeerRegistry.set(identifier, newRef);
      
      if (ref.isMe) {
        persistData('me', newRef);
        publish('me-modified', newRef);
      }

      if (ref.isHost) {
        publish('host-modified', newRef);
      }

      if(!ref.isMe && !ref.isHost) {
        addPeer(identifier, newRef);
        
        persistData('peers', Array.from(PeerRegistry));

        publish('peer-modified', newRef);
        publish('peers-list-changed', 'add');
      }

  },[PeerRegistry, addPeer, publish, getByUUID]);
  
  const unregisterPeer = useCallback((identifier, ref) => {
      // unregister by id
      PeerRegistry.delete(identifier);
      removePeer(identifier, ref);
      publish('peers-list-changed', 'remove');
  },[PeerRegistry, removePeer, publish]);

  const getPeersArray = useCallback(() => {
    return Array.from(PeerRegistry.keys()).map((id)=>PeerRegistry.get(id));
  },[PeerRegistry]);

  // prune old connections
  useEffect(()=>{
    Array.from(PeerRegistry).forEach((p)=>{
      const [ id, ref ] = p;
      const freshness = moment().diff(ref.lastSeen, 'minutes');
      if (freshness > 0) {
        unregisterPeer(id, ref);
      }
    })
  }, [PeerRegistry, unregisterPeer])

  const peerRegistryUtils = useMemo(
    () => ({
        getMe,
        getHost,
        updatePeerInfo,
        findPeer,
        registerPeer,
        unregisterPeer,
        getPeersArray
    }),
    [
      getMe,
      getHost,
      updatePeerInfo,
      findPeer,
      registerPeer,
      unregisterPeer,
      getPeersArray
    ]
  );

  peersContextValue = useMemo(() => ({
    PeerRegistry,
    ...peerRegistryUtils,
  }), [
    PeerRegistry,
    peerRegistryUtils,
  ]);

    return (<PeersContext.Provider value={peersContextValue}>{children}</PeersContext.Provider>)
}

export default PeersManager;