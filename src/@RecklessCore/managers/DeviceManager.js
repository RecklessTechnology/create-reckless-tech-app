/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  createContext,
} from 'react';

import useForceUpdate from '../useForceUpdate';
import EventsManager from './EventsManager';

import useDevicesContext from '../contexts/useDevicesContext';
import useAppContext from '../contexts/useAppContext';
import useGeneratorsContext from '../contexts/useGeneratorsContext';
import usePeersContext from '../contexts/usePeersContext';
import useTransformsContext from '../contexts/useTransformsContext';
import useThreeObjectsContext from '../contexts/useThreeObjectsContext';

export const DeviceContext = createContext(null);

export const DefaultProps = {
  name: 'unnamed',
  position: [0, 0, 0],
};

const DeviceManager = ({
  children,
  ...props
}) => {
  const { sceneJSON } = useAppContext();
  const { connections } = sceneJSON;

  const { findThreeObject } = useThreeObjectsContext();
  const { findGenerator } = useGeneratorsContext();
  const { findPeer } = usePeersContext();
  const { findTransform } = useTransformsContext();

  const identifier = useRef(Symbol('Device'));
  const node = useRef(null);

  const [events] = useState(() => EventsManager());

  const [uuid] = useState(props.uuid);
  const [name] = useState(props.name);
  const [type, setType] = useState(props.type || '');

  const [position, setPosition] = useState(props.position || [0, 0, 0]);

  // Inputs
  const updateFromInput = (prop, val) => {
    switch (prop) {
      default:
        break;
      case 'position':
        setPosition(val);
        break;
    }
  };

  useEffect(() => {
    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      const peer = findPeer(c.from);
      if (peer) { peer.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }

      const obj = findThreeObject(c.from);
      if (obj) { obj.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }

      const gen = findGenerator(c.from);
      if (gen) { gen.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }

      const transform = findTransform(c.from);
      if (transform) { transform.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }
    });
  }, [connections, uuid, findGenerator, findPeer, findTransform, findThreeObject]);

  // Outputs
  useEffect(() => { events.publish(`${uuid}-position-updated`, position); }, [uuid, position, events]);

  const { registerDevice, unregisterDevice } = useDevicesContext();
  const forceUpdate = useForceUpdate();

  // Reference to object properties
  const deviceRef = useMemo(() => ({
    uuid,
    id: identifier.current,

    name,

    type,
    setType,

    position,
    setPosition,

    subscribe: events.subscribe,
    unsubscribe: events.unsubscribe,
  }), [
    uuid,
    name,

    type, setType,

    position, setPosition,

    events,
  ]);

  // Callback to fetch properties of object
  const getRef = useCallback(() => deviceRef, [deviceRef]);

  // On load, register object with app context

  useEffect(() => {
    registerDevice(uuid, deviceRef);
    return () => unregisterDevice(uuid, deviceRef);
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  // Final context for provider
  const contextValue = useMemo(() => ({
    uuid,
    id: identifier.current,
    name,
    nodeRef: node,
    getRef,

    type,
    setType,
    position,
    setPosition,

    forceUpdate,

    ...events,
  }),
  [
    uuid,
    identifier,
    name,
    node,
    getRef,

    type, setType,
    position, setPosition,

    forceUpdate,
    events,
  ]);

  return (
    <DeviceContext.Provider value={contextValue}>
      {children}
    </DeviceContext.Provider>
  );
};

DeviceManager.whyDidYouRender = false;

export default DeviceManager;
