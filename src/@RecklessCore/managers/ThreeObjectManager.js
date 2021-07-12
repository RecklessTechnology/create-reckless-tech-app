import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useEffect
} from 'react';
import useForceUpdate from '../useForceUpdate';
import EventsManager from '../managers/EventsManager';

import useThreeObjectsContext from '../contexts/useThreeObjectsContext';
import useAppContext from '../contexts/useAppContext';

import RenderThreeChildrenView from '../components/@objects/RenderThreeChildren/view';
import useGeneratorsContext from '../contexts/useGeneratorsContext';
import usePeersContext from '../contexts/usePeersContext';
import useDevicesConext from '../contexts/useDevicesContext';
import useTransformsConext from '../contexts/useTransformsContext';

// import { throttle } from '../utils/throttle';

export const ThreeObjectContext = React.createContext(null);
export const ThreeObjectPositionContext = React.createContext(null);
export const ThreeObjectRotationContext = React.createContext(null);
export const ThreeObjectScaleContext = React.createContext(null);


export const DefaultProps = {
  name: 'unnamed',
  position: [0,0,0]
}

const ThreeObjectManager = ({
  name,
  displayName,
  type,
  children,
  ...props
}) => {
  const isMounted = useRef(false);

  const { sceneJSON } = useAppContext();
  const { connections} = sceneJSON;

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

  const [position, setPosition] = useState(props.position || [0,0,0]);
  const [rotation, setRotation] = useState(props.rotation || [0,0,0]);
  const [scale, setScale] = useState(props.scale || 1);
  
  // Inputs
  const updateFromInput = (prop, val)=>{
    switch(prop) {
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
  
  useEffect(()=>{
    connections.filter((c)=>(c.to===uuid)).forEach((c)=>{
      const peer = findPeer(c.from);
      if (peer) { peer.subscribe(`${c.fromProp}-updated`, (val)=>{updateFromInput(c.fromProp, val)}) }

      const gen = findGenerator(c.from);
      if (gen) { gen.subscribe(`${c.fromProp}-updated`, (val)=>{updateFromInput(c.fromProp, val)}) }

      const device = findDevice(c.from);
      if (device) { device.subscribe(`${c.fromProp}-updated`, (val)=>{updateFromInput(c.fromProp, val)}) }

      const transform = findTransform(c.from);
      if (transform) { transform.subscribe(`${c.fromProp}-updated`, (val)=>{updateFromInput(c.fromProp, val)}) }
    })
  }, [connections, uuid, findGenerator, findPeer, findDevice, findTransform])

  // Outputs
  
  // Limit publish events to once every...
  // const broadcastThrottle = 1000/60;

  useEffect(() => {
    if (isMounted.current) {
      if (events !== undefined) {
        events.publish('disabled-updated', disabled)
      }
    }
  }, [disabled, events]);
  
  // const throttleDisabled = useRef(throttle((newValue) => events.publish('disabled-updated', disabled), broadcastThrottle));
  // useEffect(() => throttleDisabled.current(disabled), [disabled]);

  useEffect(() => {
    if (isMounted.current) {
      if (events !== undefined) {
        events.publish('debug-updated', debug)
      }
    }
  }, [debug, events]);

  // const throttleDebug = useRef(throttle((newValue) => events.publish('debug-updated', debug), broadcastThrottle));
  // useEffect(() => throttleDebug.current(debug), [debug]);

  useEffect(() => {
    if (isMounted.current) {
      if (events !== undefined) {
        events.publish('position-updated', position)
      }
    }
  }, [position, events]);

  // const throttlePosition = useRef(throttle((newValue) => events.publish('position-updated', position), broadcastThrottle));
  // useEffect(() => throttlePosition.current(position), [position]);

  useEffect(() => {
    if (isMounted.current) {
      if (events !== undefined) {
        events.publish('rotation-updated', rotation)
      }
    }
  }, [rotation, events]);

  // const throttleRotation = useRef(throttle((newValue) => events.publish('rotation-updated', rotation), broadcastThrottle));
  // useEffect(() => throttleRotation.current(rotation), [rotation]);

  useEffect(() => {
    if (isMounted.current) {
      if (events !== undefined) {
        events.publish('scale-updated', scale)
      }
    }
  }, [scale, events]);

  // const throttleScale = useRef(throttle((newValue) => events.publish('scale-updated', scale), broadcastThrottle));
  // useEffect(() => throttleScale.current(scale), [scale]);

  const { registerThreeObject, unregisterThreeObject } = useThreeObjectsContext();
  const forceUpdate = useForceUpdate();

  // Reference to object properties
  const threeObjectRef = useMemo(
    () => ({
      uuid: uuid,
      id: identifier.current,
      
      name, displayName, type,
      
      disabled, setDisabled,
      debug, setDebug,

      position, setPosition,
      rotation, setRotation,
      scale, setScale,

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
    ]
  );

  // Callback to fetch properties of object
  const getRef = useCallback(() => threeObjectRef, [threeObjectRef]);

  // // On load, register object with app context
  useLayoutEffect(() => {
    isMounted.current = true;
    // const id = identifier.current;
    registerThreeObject(uuid, threeObjectRef);
    return ()=>{
      isMounted.current = false;
      unregisterThreeObject(uuid, threeObjectRef)
    };
  }, [registerThreeObject, unregisterThreeObject, threeObjectRef, uuid]);

  // Final context for provider
  const contextValue = useMemo(()=>({
    uuid: uuid,
    id: identifier.current,
    name,
    nodeRef: node,
    getRef,

    disabled, setDisabled,
    debug, setDebug,

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

  const positionContextValue = useMemo(()=>({ position }), [ position ]);
  const rotationContextValue = useMemo(()=>({ rotation }), [ rotation ]);
  const scaleContextValue = useMemo(()=>({ scale }), [ scale ]);

  return (
    <ThreeObjectContext.Provider value={contextValue}>
      {/* <Generators {...{generators, connections}}></Generators> */}
      {/* <Peers {...{peers, connections}}></Peers> */}
      {/* <Devices {...{devices, connections}}></Devices> */}
      <ThreeObjectPositionContext.Provider value={positionContextValue}>
        <ThreeObjectRotationContext.Provider value={rotationContextValue}>
          <ThreeObjectScaleContext.Provider value={scaleContextValue}>
            <RenderThreeChildrenView {...{
              name: name,
              node: node,
              position: position,
              rotation: rotation,
              scale: scale,
            }}>
              {!disabled ? children : null}
            </RenderThreeChildrenView>
          </ThreeObjectScaleContext.Provider>
        </ThreeObjectRotationContext.Provider>
      </ThreeObjectPositionContext.Provider>
    </ThreeObjectContext.Provider>
  );
}

ThreeObjectManager.whyDidYouRender = false;

export default ThreeObjectManager;