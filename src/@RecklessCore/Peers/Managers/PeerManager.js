import PropTypes, { node } from 'prop-types';

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  createContext,
} from 'react';
import useForceUpdate from '../../Utils/useForceUpdate';

import useAppContext from '../../App/Contexts/useAppContext';

import useConnectionsContext from '../../Connections/Contexts/useConnectionsContext';
import usePeersContext from '../Contexts/usePeersContext';

export const PeerContext = createContext(null);
PeerContext.displayName = 'Peer Context';

export const DefaultProps = {
  name: 'unnamed',
  position: [0, 0, 0],
};

const PeerManager = ({
  connections,
  children = node,
  ...props
}) => {
  const {
    subscribe, unsubscribe, publish,
  } = useAppContext();

  const { registerPeer, unregisterPeer } = usePeersContext();
  const { getMe, findConnection } = useConnectionsContext();
  const forceUpdate = useForceUpdate();

  const nodeRef = useRef(null);

  const [uuid] = useState(props.uuid);
  const [name] = useState(props.name);
  const [type, setType] = useState(props.type);

  const [data, setData] = useState(props.data || [0, 0, 0]);

  const [connection, setConnection] = useState();

  useEffect(() => {
    setConnection(findConnection(uuid));
  }, [findConnection, uuid]);

  // Inputs
  const updateFromInput = useCallback((prop, from, val) => {
    const me = getMe();
    // findConnection();
    switch (prop.toLowerCase()) {
      default:
        // eslint-disable-next-line no-console
        console.log(`Unknown Prop Sent to PeerManager: ${prop}`);
        break;
      case 'data':
        if (connection !== undefined) {
          if (typeof connection.sendData === 'function') {
            connection.sendData({
              type: from, payload: val, uuid: me.uuid, from: me.connectionId, timestamp: Date.now,
            });
            setData(val);
          }
        }
        break;
    }
  }, [connection, getMe]);

  useEffect(() => {
    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), c.fromProp.toLowerCase(), val); });
    });
    return () => {
      connections.filter((c) => (c.to === uuid)).forEach((c) => {
        unsubscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), c.fromProp.toLowerCase(), val); });
      });
    };
  }, [
    connections,
    uuid,
    subscribe,
    unsubscribe,
    updateFromInput,
  ]);

  useEffect(() => { publish(`${uuid}-data-updated`, data); }, [uuid, data, publish]);

  // Reference to object properties
  const peerRef = useMemo(() => ({
    uuid,
    name,

    data,
    setData,
  }), [
    uuid,
    name,

    data, setData,
  ]);

  // Callback to fetch properties of object
  const getRef = useCallback(() => peerRef, [peerRef]);

  // On load, register object with app context
  useEffect(() => {
    registerPeer(uuid, peerRef);
    return () => unregisterPeer(uuid, peerRef);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Final context for provider
  const contextValue = useMemo(() => ({
    uuid,
    name,

    nodeRef,
    getRef,

    type,
    setType,
    data,
    setData,

    forceUpdate,
  }),
  [
    uuid,
    name,

    nodeRef,
    getRef,

    type, setType,
    data, setData,

    forceUpdate,
  ]);

  return (
    <PeerContext.Provider value={contextValue}>
      {children}
    </PeerContext.Provider>
  );
};

PeerManager.whyDidYouRender = (process.env.NODE_ENV === 'development');

PeerManager.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  children: PropTypes.node.isRequired,
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.shape([]).isRequired,
};

export default PeerManager;
