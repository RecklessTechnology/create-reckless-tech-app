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

import useThreeObjectsContext from '../Contexts/useThreeObjectsContext';
import useAppContext from '../../App/Contexts/useAppContext';

import ThreeObjectView from '../view';

export const ThreeObjectContext = createContext(null);
ThreeObjectContext.displayName = 'Three Object Context';

export const ThreeObjectPositionContext = createContext(null);
ThreeObjectPositionContext.displayName = 'Three Object Position Context';

export const ThreeObjectRotationContext = createContext(null);
ThreeObjectRotationContext.displayName = 'Three Object Rotation Context';

export const ThreeObjectScaleContext = createContext(null);
ThreeObjectScaleContext.displayName = 'Three Object Scale Context';

export const DefaultProps = {
  uuid: 'xxx',
  name: 'unnamed',
  type: 'three-object',
  disabled: false,
  debug: false,
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
};

const ThreeObjectManager = ({
  connections,
  name,
  type,
  children,
  ...props
}) => {
  const isMounted = useRef(false);

  const {
    subscribe, unsubscribe, publish,
  } = useAppContext();

  const [uuid] = useState(props.uuid);

  const [disabled, setDisabled] = useState(props.disabled || false);
  const [debug, setDebug] = useState(props.debug || false);

  const [position, setPosition] = useState(props.position || [0, 0, 0]);
  const [rotation, setRotation] = useState(props.rotation || [0, 0, 0]);
  const [scale, setScale] = useState(props.scale || [1, 1, 1]);

  const [freqs, setFreqs] = useState([]);

  const identifier = useRef(Symbol(`${type}-${uuid}`));
  const node = useRef(null);

  // Inputs
  const updateFromInput = (prop, val) => {
    switch (prop.toLowerCase()) {
      default:
        // eslint-disable-next-line no-console
        console.log(`Unknown Prop Sent to ThreeObjectManager: ${prop}`);
        break;
      case 'freqs':
        setFreqs(val);
        break;
      case 'position':
        setPosition(val);
        break;
      case 'rotation':
        setRotation(val);
        break;
      case 'scale':
        setScale(val);
        break;
    }
  };

  useEffect(() => {
    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
    });
    return () => {
      connections.filter((c) => (c.to === uuid)).forEach((c) => {
        unsubscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
      });
    };
  }, [connections, uuid, subscribe, unsubscribe]);

  // Outputs

  // Limit publish events to once every...
  // const broadcastThrottle = 1000/60;

  useEffect(() => {
    if (isMounted.current) {
      publish(`${uuid}-disabled-updated`, disabled);
    }
  }, [disabled, publish, uuid]);

  useEffect(() => {
    if (isMounted.current) {
      publish(`${uuid}-debug-updated`, debug);
    }
  }, [debug, publish, uuid]);

  useEffect(() => {
    if (isMounted.current) {
      publish(`${uuid}-position-updated`, position);
    }
  }, [position, publish, uuid]);

  useEffect(() => {
    if (isMounted.current) {
      publish(`${uuid}-rotation-updated`, rotation);
    }
  }, [rotation, publish, uuid]);

  useEffect(() => {
    if (isMounted.current) {
      publish(`${uuid}-scale-updated`, scale);
    }
  }, [scale, publish, uuid]);

  useEffect(() => {
    if (isMounted.current) {
      publish(`${uuid}-freqs-updated`, freqs);
    }
  }, [freqs, publish, uuid]);

  const { registerThreeObject, unregisterThreeObject } = useThreeObjectsContext();
  const forceUpdate = useForceUpdate();

  // Reference to object properties
  const threeObjectRef = useMemo(
    () => ({
      uuid,
      id: identifier.current,

      name,
      type,

      disabled,
      setDisabled,
      debug,
      setDebug,

      position,
      setPosition,
      rotation,
      setRotation,
      scale,
      setScale,

      freqs,
      setFreqs,
    }),
    [
      uuid,
      name, type,

      disabled, setDisabled,
      debug, setDebug,

      position, setPosition,
      rotation, setRotation,
      scale, setScale,

      freqs, setFreqs,
    ],
  );

  // Callback to fetch properties of object
  const getRef = useCallback(() => threeObjectRef, [threeObjectRef]);

  // On load, register object with app context
  useEffect(() => {
    isMounted.current = true;
    registerThreeObject(uuid, threeObjectRef);
    return () => {
      isMounted.current = false;
      unregisterThreeObject(uuid, threeObjectRef);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Final context for provider
  const contextValue = useMemo(() => ({
    uuid,
    id: identifier.current,
    name,
    nodeRef: node,
    getRef,

    disabled,
    setDisabled,
    debug,
    setDebug,

    setPosition,
    setRotation,
    setScale,

    freqs,
    setFreqs,

    forceUpdate,
  }), [
    uuid,
    identifier,
    name,
    node,
    getRef,
    disabled, setDisabled,
    debug, setDebug,
    setPosition,
    setRotation,
    setScale,
    freqs,
    setFreqs,
    forceUpdate,
  ]);

  const positionContextValue = useMemo(() => ({ position }), [position]);
  const rotationContextValue = useMemo(() => ({ rotation }), [rotation]);
  const scaleContextValue = useMemo(() => ({ scale }), [scale]);

  return (
    <ThreeObjectContext.Provider value={contextValue}>
      <ThreeObjectPositionContext.Provider value={positionContextValue}>
        <ThreeObjectRotationContext.Provider value={rotationContextValue}>
          <ThreeObjectScaleContext.Provider value={scaleContextValue}>
            <ThreeObjectView {...{
              name,
              node,
              position,
              rotation,
              scale,
            }}
            >
              {!disabled ? children : []}
            </ThreeObjectView>
          </ThreeObjectScaleContext.Provider>
        </ThreeObjectRotationContext.Provider>
      </ThreeObjectPositionContext.Provider>
    </ThreeObjectContext.Provider>
  );
};

ThreeObjectManager.whyDidYouRender = (process.env.NODE_ENV === 'development');

ThreeObjectManager.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  children: PropTypes.node.isRequired,
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  debug: PropTypes.bool.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  rotation: PropTypes.arrayOf(PropTypes.number).isRequired,
  scale: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ThreeObjectManager;
