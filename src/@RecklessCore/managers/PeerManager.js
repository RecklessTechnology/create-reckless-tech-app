/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  createContext,
} from 'react';
import useForceUpdate from '../utils/useForceUpdate';
import EventsManager from './EventsManager';

import useConnectionsContext from '../contexts/useConnectionsContext';
import usePeersContext from '../contexts/usePeersContext';
import useAppContext from '../contexts/useAppContext';
import useGeneratorsContext from '../contexts/useGeneratorsContext';
import useDevicesContext from '../contexts/useDevicesContext';
import useTransformsContext from '../contexts/useTransformsContext';
import useThreeObjectsContext from '../contexts/useThreeObjectsContext';

export const PeerContext = createContext(null);

export const DefaultProps = {
  name: 'unnamed',
  position: [0, 0, 0],
};

const PeerManager = ({
  children,
  ...props
}) => {
  const { sceneJSON } = useAppContext();
  const { connections } = sceneJSON;

  const { registerPeer, unregisterPeer } = usePeersContext();
  const { getMe, findConnection } = useConnectionsContext();
  const forceUpdate = useForceUpdate();

  const { findThreeObject } = useThreeObjectsContext();
  const { findGenerator } = useGeneratorsContext();
  const { findDevice } = useDevicesContext();
  const { findTransform } = useTransformsContext();

  const node = useRef(null);

  const [events] = useState(() => EventsManager());

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
    switch (prop) {
      default:
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
      const obj = findThreeObject(c.from);
      if (obj) { obj.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), c.fromProp.toLowerCase(), val); }); }

      const gen = findGenerator(c.from);
      if (gen) { gen.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), c.fromProp.toLowerCase(), val); }); }

      const device = findDevice(c.from);
      if (device) { device.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), c.fromProp.toLowerCase(), val); }); }

      const transform = findTransform(c.from);
      if (transform) { transform.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), c.fromProp.toLowerCase(), val); }); }
    });
  }, [
    connections,
    uuid,
    findGenerator,
    findDevice,
    findTransform,
    findThreeObject,
    updateFromInput,
  ]);

  useEffect(() => { events.publish(`${uuid}-data-updated`, data); }, [uuid, data, events]);

  // Reference to object properties
  const peerRef = useMemo(() => ({
    uuid,
    name,

    data,
    setData,

    subscribe: events.subscribe,
    unsubscribe: events.unsubscribe,
  }), [
    uuid,
    name,

    data, setData,

    events,
  ]);

  // Callback to fetch properties of object
  const getRef = useCallback(() => peerRef, [peerRef]);

  // On load, register object with app context
  useEffect(() => {
    registerPeer(uuid, peerRef);
    return () => unregisterPeer(uuid, peerRef);
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  // Final context for provider
  const contextValue = useMemo(() => ({
    uuid,
    name,

    nodeRef: node,
    getRef,

    type,
    setType,
    data,
    setData,

    forceUpdate,

    ...events,
  }),
  [
    uuid,
    name,

    node,
    getRef,

    type, setType,
    data, setData,

    forceUpdate,
    events,
  ]);

  return (
    <PeerContext.Provider value={contextValue}>
      {children}
    </PeerContext.Provider>
  );
};

PeerManager.whyDidYouRender = false;

export default PeerManager;
