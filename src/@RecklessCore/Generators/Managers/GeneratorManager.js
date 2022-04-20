import PropTypes from 'prop-types';

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

import useGeneratorsContext from '../Contexts/useGeneratorsContext';

export const GeneratorContext = createContext(null);
GeneratorContext.displayName = 'Generator Context';

export const DefaultProps = {
  name: 'unnamed',
  position: [0, 0, 0],
};

const GeneratorManager = ({
  children,
  ...props
}) => {
  const { publish } = useAppContext();

  const [uuid] = useState(props.uuid);
  const [name] = useState(props.name);
  const [type, setType] = useState(props.type || '');
  const [resolution, setResolution] = useState(parseInt(props.resolution, 10) || 1);
  const [rpm, setRpm] = useState(parseInt(props.rpm, 10) || 1000);
  const [looped, setLooped] = useState(props.looped || true);
  const [paused, setPaused] = useState(props.paused || false);

  const identifier = useRef(Symbol(`${type}-${uuid}`));
  const node = useRef(null);

  const [position, setPosition] = useState([0, 0, 0]);

  useEffect(() => { publish(`${uuid}-position-updated`, position); }, [uuid, position, publish]);
  useEffect(() => { publish(`${uuid}-paused-updated`, paused); }, [uuid, paused, publish]);
  useEffect(() => { publish(`${uuid}-looped-updated`, looped); }, [uuid, looped, publish]);
  useEffect(() => { publish(`${uuid}-rpm-updated`, rpm); }, [uuid, rpm, publish]);
  useEffect(() => { publish(`${uuid}-resolution-updated`, resolution); }, [uuid, resolution, publish]);

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
  }), [
    uuid,
    name,

    type, setType,
    resolution, setResolution,
    rpm, setRpm,
    looped, setLooped,
    paused, setPaused,
    position, setPosition,
  ]);

  // Callback to fetch properties of object
  const getRef = useCallback(() => generatorRef, [generatorRef]);

  // // On load, register object with app context
  useEffect(() => {
    registerGenerator(uuid, generatorRef);
    return () => unregisterGenerator(uuid, generatorRef);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  ]);

  return (
    <GeneratorContext.Provider value={contextValue}>
      {children}
    </GeneratorContext.Provider>
  );
};

GeneratorManager.propTypes = {
  children: PropTypes.node.isRequired,
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  resolution: PropTypes.number.isRequired,
  rpm: PropTypes.number.isRequired,
  looped: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
};

GeneratorManager.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default GeneratorManager;
