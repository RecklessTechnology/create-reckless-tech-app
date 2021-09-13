/* eslint-disable react/destructuring-assignment */
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

import useGeneratorsContext from '../contexts/useGeneratorsContext';

export const GeneratorContext = createContext(null);

export const DefaultProps = {
  name: 'unnamed',
  position: [0, 0, 0],
};

const GeneratorManager = ({
  children,
  ...props
}) => {
  const identifier = useRef(Symbol('Generator'));
  const node = useRef(null);

  const [events] = useState(() => EventsManager());

  const [uuid] = useState(props.uuid);
  const [name] = useState(props.name);
  const [type, setType] = useState(props.type || '');
  const [resolution, setResolution] = useState(parseInt(props.resolution, 10) || 1);
  const [rpm, setRpm] = useState(parseInt(props.rpm, 10) || 1000);
  const [looped, setLooped] = useState(props.looped || true);
  const [paused, setPaused] = useState(props.paused || false);

  const [position, setPosition] = useState([0, 0, 0]);

  useEffect(() => { events.publish(`${uuid}-position-updated`, position); }, [uuid, position, events]);
  useEffect(() => { events.publish(`${uuid}-paused-updated`, paused); }, [uuid, paused, events]);
  useEffect(() => { events.publish(`${uuid}-looped-updated`, looped); }, [uuid, looped, events]);
  useEffect(() => { events.publish(`${uuid}-rpm-updated`, rpm); }, [uuid, rpm, events]);
  useEffect(() => { events.publish(`${uuid}-resolution-updated`, resolution); }, [uuid, resolution, events]);

  const { registerGenerator, unregisterGenerator } = useGeneratorsContext();
  const forceUpdate = useForceUpdate();

  // Reference to object properties
  const generatorRef = useMemo(() => ({
    uuid,
    id: identifier.current,

    name,

    type,
    setType,
    resolution,
    setResolution,
    rpm,
    setRpm,
    looped,
    setLooped,
    paused,
    setPaused,
    position,
    setPosition,

    subscribe: events.subscribe,
    unsubscribe: events.unsubscribe,
  }), [
    uuid,
    name,

    type, setType,
    resolution, setResolution,
    rpm, setRpm,
    looped, setLooped,
    paused, setPaused,
    position, setPosition,

    events,
  ]);

  // Callback to fetch properties of object
  const getRef = useCallback(() => generatorRef, [generatorRef]);

  // // On load, register object with app context
  useEffect(() => {
    registerGenerator(uuid, generatorRef);
    return () => unregisterGenerator(uuid, generatorRef);
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
    resolution,
    setResolution,
    rpm,
    setRpm,
    looped,
    setLooped,
    paused,
    setPaused,
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
    resolution, setResolution,
    rpm, setRpm,
    looped, setLooped,
    paused, setPaused,
    position, setPosition,

    forceUpdate,
    events,
  ]);

  return (
    <GeneratorContext.Provider value={contextValue}>
      {children}
    </GeneratorContext.Provider>
  );
};

GeneratorManager.propTypes = {
  children: PropTypes.shape([]).isRequired,
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  resolution: PropTypes.number.isRequired,
  rpm: PropTypes.number.isRequired,
  looped: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
};

GeneratorManager.whyDidYouRender = false;

export default GeneratorManager;
