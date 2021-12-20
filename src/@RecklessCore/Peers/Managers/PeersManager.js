import PropTypes from 'prop-types';

import React, {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';

import moment from 'moment';

import useAppContext from '../../App/Contexts/useAppContext';

export const PeersContext = createContext(null);
// eslint-disable-next-line import/no-mutable-exports
export let peersContextValue = {};

const PeersManager = ({
  children,
}) => {
  const { publish } = useAppContext();

  // Peer Connections
  const [PeerRegistry] = useState(() => new Map());

  const findPeer = useCallback((id) => PeerRegistry.get(id), [PeerRegistry]);

  const registerPeer = useCallback((identifier, ref) => {
    let oldRef = {};
    if (oldRef !== undefined) {
      oldRef = findPeer(identifier);
      PeerRegistry.delete(identifier);
    }

    const newRef = {
      ...oldRef,
      ...ref,
    };

    // register by id
    PeerRegistry.set(identifier, newRef);

    publish('peer-modified', newRef);
    publish('peers-list-changed', newRef, 'add');
  }, [PeerRegistry, findPeer, publish]);

  const unregisterPeer = useCallback((identifier) => {
    // unregister by id
    PeerRegistry.delete(identifier);
    publish('peers-list-changed', identifier, 'remove');
  }, [PeerRegistry, publish]);

  const getPeersArray = useCallback(
    () => Array.from(PeerRegistry.keys()).map((id) => PeerRegistry.get(id)),
    [PeerRegistry],
  );

  // prune old connections
  useEffect(() => {
    Array.from(PeerRegistry).forEach((p) => {
      const [id, ref] = p;
      const freshness = moment().diff(ref.lastSeen, 'seconds');
      if (freshness > 0) {
        unregisterPeer(id, ref);
      }
    });
  }, [PeerRegistry, unregisterPeer]);

  const peerRegistryUtils = useMemo(
    () => ({
      findPeer,
      registerPeer,
      unregisterPeer,
      getPeersArray,
    }),
    [
      findPeer,
      registerPeer,
      unregisterPeer,
      getPeersArray,
    ],
  );

  peersContextValue = useMemo(() => ({
    PeerRegistry,
    ...peerRegistryUtils,
  }), [
    PeerRegistry,
    peerRegistryUtils,
  ]);

  return (
    <PeersContext.Provider value={peersContextValue}>
      {children}
    </PeersContext.Provider>
  );
};

PeersManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PeersManager;
