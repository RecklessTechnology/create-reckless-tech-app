/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

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

import useAppContext from '../contexts/useAppContext';
import useTransformsContext from '../contexts/useTransformsContext';
import useGeneratorsContext from '../contexts/useGeneratorsContext';
import usePeersContext from '../contexts/usePeersContext';
import useDevicesConext from '../contexts/useDevicesContext';

export const TransformContext = createContext(null);

export const DefaultProps = {
  name: 'unnamed',
  position: [0, 0, 0],
};

const TransformManager = ({
  children,
  ...props
}) => {
  const { sceneJSON } = useAppContext();
  const { connections } = sceneJSON;

  const { findGenerator } = useGeneratorsContext();
  const { findPeer } = usePeersContext();
  const { findDevice } = useDevicesConext();

  const identifier = useRef(Symbol('Transform'));
  const node = useRef(null);

  const [events] = useState(() => EventsManager());

  const [uuid] = useState(props.uuid);
  const [name] = useState(props.name);
  const [displayName] = useState(props.displayName);
  const [type, setType] = useState(props.type || '');

  const [amount, setAmount] = useState(props.amount || 1);
  const [value, setValue] = useState(props.value || [0, 0, 0]);

  // Inputs
  const updateFromInput = (prop, val) => {
    setValue(val);
  };

  useEffect(() => {
    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      const peer = findPeer(c.from);
      if (peer) { peer.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }

      const gen = findGenerator(c.from);
      if (gen) { gen.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }

      const device = findDevice(c.from);
      if (device) { device.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }
    });
  }, [connections, uuid, findGenerator, findPeer, findDevice]);

  useEffect(() => { events.publish(`${uuid}-value-updated`, value); }, [value, events, uuid]);
  useEffect(() => { events.publish(`${uuid}-amount-updated`, amount); }, [amount, events, uuid]);

  const { registerTransform, unregisterTransform } = useTransformsContext();
  const forceUpdate = useForceUpdate();

  // Reference to object properties
  const peerRef = useMemo(() => ({
    uuid,
    id: identifier.current,

    name,
    displayName,

    type,
    setType,

    value,
    setValue,
    amount,
    setAmount,

    subscribe: events.subscribe,
    unsubscribe: events.unsubscribe,
  }), [
    uuid,
    name, displayName,

    type, setType,

    value, setValue,
    amount, setAmount,

    events,
  ]);

  // Callback to fetch properties of object
  const getRef = useCallback(() => peerRef, [peerRef]);

  // On load, register object with app context
  useEffect(() => {
    // const id = identifier.current;
    registerTransform(uuid, peerRef);
    return () => unregisterTransform(uuid, peerRef);
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
    value,
    setValue,
    amount,
    setAmount,

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
    value, setValue,
    amount, setAmount,

    forceUpdate,
    events,
  ]);

  return (
    <TransformContext.Provider value={contextValue}>
      {children}
    </TransformContext.Provider>
  );
};

TransformManager.whyDidYouRender = false;

TransformManager.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default TransformManager;
