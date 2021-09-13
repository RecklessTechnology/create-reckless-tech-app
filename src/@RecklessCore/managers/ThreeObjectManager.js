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
import useForceUpdate from '../utils/useForceUpdate';
import EventsManager from './EventsManager';

import useThreeObjectsContext from '../contexts/useThreeObjectsContext';
import useAppContext from '../contexts/useAppContext';

import RenderThreeChildrenView from '../components/@objects/RenderThreeChildren/view';
import useGeneratorsContext from '../contexts/useGeneratorsContext';
import usePeersContext from '../contexts/usePeersContext';
import useDevicesConext from '../contexts/useDevicesContext';
import useTransformsConext from '../contexts/useTransformsContext';

export const ThreeObjectContext = createContext(null);
export const ThreeObjectPositionContext = createContext(null);
export const ThreeObjectRotationContext = createContext(null);
export const ThreeObjectScaleContext = createContext(null);

export const DefaultProps = {
  name: 'unnamed',
  position: [0, 0, 0],
};

const ThreeObjectManager = ({
  name,
  displayName,
  type,
  children,
  ...props
}) => {
  const isMounted = useRef(false);

  const { sceneJSON } = useAppContext();
  const { connections } = sceneJSON;

  const { findGenerator } = useGeneratorsContext();
  const { findPeer } = usePeersContext();
  const { findDevice } = useDevicesConext();
  const { findTransform } = useTransformsConext();

  const identifier = useRef(Symbol('ThreeObject'));
  const node = useRef(null);

  const [uuid] = useState(props.uuid);
  const [events] = useState(() => EventsManager());

  const [disabled, setDisabled] = useState(props.disabled || false);
  const [debug, setDebug] = useState(props.debug || false);

  const [position, setPosition] = useState(props.position || [0, 0, 0]);
  const [rotation, setRotation] = useState(props.rotation || [0, 0, 0]);
  const [scale, setScale] = useState(props.scale || 1);

  // Inputs
  const updateFromInput = (prop, val) => {
    switch (prop) {
      default:
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
      const peer = findPeer(c.from);
      if (peer) { peer.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }

      const gen = findGenerator(c.from);
      if (gen) { gen.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }

      const device = findDevice(c.from);
      if (device) { device.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }

      const transform = findTransform(c.from);
      if (transform) { transform.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }
    });
  }, [connections, uuid, findGenerator, findPeer, findDevice, findTransform]);

  // Outputs

  // Limit publish events to once every...
  // const broadcastThrottle = 1000/60;

  useEffect(() => {
    if (isMounted.current) {
      if (events !== undefined) {
        events.publish(`${uuid}-disabled-updated`, disabled);
      }
    }
  }, [disabled, events, uuid]);

  useEffect(() => {
    if (isMounted.current) {
      if (events !== undefined) {
        events.publish(`${uuid}-debug-updated`, debug);
      }
    }
  }, [debug, events, uuid]);

  useEffect(() => {
    if (isMounted.current) {
      if (events !== undefined) {
        events.publish(`${uuid}-position-updated`, position);
      }
    }
  }, [position, events, uuid]);

  useEffect(() => {
    if (isMounted.current) {
      if (events !== undefined) {
        events.publish(`${uuid}-rotation-updated`, rotation);
      }
    }
  }, [rotation, events, uuid]);

  useEffect(() => {
    if (isMounted.current) {
      if (events !== undefined) {
        events.publish(`${uuid}-scale-updated`, scale);
      }
    }
  }, [scale, events, uuid]);

  const { registerThreeObject, unregisterThreeObject } = useThreeObjectsContext();
  const forceUpdate = useForceUpdate();

  // Reference to object properties
  const threeObjectRef = useMemo(
    () => ({
      uuid,
      id: identifier.current,

      name,
      displayName,
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

      subscribe: events.subscribe,
      unsubscribe: events.unsubscribe,
    }),
    [
      uuid,
      name, displayName, type,

      disabled, setDisabled,
      debug, setDebug,

      position, setPosition,
      rotation, setRotation,
      scale, setScale,

      events,
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
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

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

    forceUpdate,

    ...events,
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
    forceUpdate,
    events,
  ]);

  const positionContextValue = useMemo(() => ({ position }), [position]);
  const rotationContextValue = useMemo(() => ({ rotation }), [rotation]);
  const scaleContextValue = useMemo(() => ({ scale }), [scale]);

  return (
    <ThreeObjectContext.Provider value={contextValue}>
      <ThreeObjectPositionContext.Provider value={positionContextValue}>
        <ThreeObjectRotationContext.Provider value={rotationContextValue}>
          <ThreeObjectScaleContext.Provider value={scaleContextValue}>
            <RenderThreeChildrenView {...{
              name,
              node,
              position,
              rotation,
              scale,
            }}
            >
              {!disabled ? children : []}
            </RenderThreeChildrenView>
          </ThreeObjectScaleContext.Provider>
        </ThreeObjectRotationContext.Provider>
      </ThreeObjectPositionContext.Provider>
    </ThreeObjectContext.Provider>
  );
};

ThreeObjectManager.whyDidYouRender = false;

export default ThreeObjectManager;
