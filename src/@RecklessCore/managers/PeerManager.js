import React, {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    useEffect,
} from 'react';
import useForceUpdate from '../useForceUpdate';
import EventsManager from '../managers/EventsManager';

import usePeersContext from '../contexts/usePeersContext';
import useAppContext from '../contexts/useAppContext';
import useGeneratorsContext from '../contexts/useGeneratorsContext';
import useDevicesContext from '../contexts/useDevicesContext';
import useTransformsContext from '../contexts/useTransformsContext';
import useThreeObjectsContext from '../contexts/useThreeObjectsContext';

// import { throttle } from '../utils/throttle';

export const PeerContext = React.createContext(null);

export const DefaultProps = {
    name: 'unnamed',
    position: [0,0,0]
}

const PeerManager = ({
    children,
    ...props
}) => {
    const isMounted = useRef(false);

    const { sceneJSON } = useAppContext();
    const { connections} = sceneJSON;

    const { registerPeer, unregisterPeer } = usePeersContext();
    const forceUpdate = useForceUpdate();

    const { findThreeObject } = useThreeObjectsContext();
    const { findGenerator } = useGeneratorsContext();
    const { findDevice } = useDevicesContext();
    const { findTransform } = useTransformsContext();
    
    const identifier = useRef(Symbol('Peer'));
    const node = useRef(null);
    
    const [events] = useState(() => EventsManager());

    const [uuid] = useState(props.uuid);
    const [name] = useState(props.name);
    const [displayName] = useState(props.displayName);
    const [type, setType] = useState(props.type || '');

    const [data, setData] = useState(props.data || [0,0,0]);


    // Inputs
    const updateFromInput = (prop, val)=>{
      switch(prop) {
        default:
          break;
        case 'data':
          setData(val);
          break;
      }
    };
    
    useEffect(()=>{
      connections.filter((c)=>(c.to===uuid)).forEach((c)=>{
        const obj = findThreeObject(c.from);
        if (obj) { obj.subscribe(`${c.fromProp}-updated`, (val)=>{updateFromInput(c.fromProp, val)}) }

        const gen = findGenerator(c.from);
        if (gen) { gen.subscribe(`${c.fromProp}-updated`, (val)=>{updateFromInput(c.fromProp, val)}) }
  
        const device = findDevice(c.from);
        if (device) { device.subscribe(`${c.fromProp}-updated`, (val)=>{updateFromInput(c.fromProp, val)}) }
  
        const transform = findTransform(c.from);
        if (transform) { transform.subscribe(`${c.fromProp}-updated`, (val)=>{updateFromInput(c.fromProp, val)}) }
      })
    }, [connections, uuid, findGenerator, findDevice, findTransform, findThreeObject])

    // Outputs

    // Limit publish events to once every...
    // const broadcastThrottle = 1000/60;
    
    useEffect(() => { events.publish('data-updated', data) }, [data, events]);

    // const throttled = useRef(throttle((newValue) => events.publish('position-updated', position), broadcastThrottle))
    // useEffect(() => throttled.current(position), [position])
    
    // Reference to object properties
    const peerRef = useMemo(() => {
      return ({
        uuid: uuid,
        id: identifier.current,
        
        name, displayName,
        
        type, setType,
        
        data, setData,

        subscribe: events.subscribe,
        unsubscribe: events.unsubscribe,
      })
    }, [
      uuid,
      name, displayName,

      type, setType,
      
      data, setData,

      events,
    ]);

    // Callback to fetch properties of object
    const getRef = useCallback(() => peerRef, [peerRef]);

    // // On load, register object with app context
    useLayoutEffect(() => {
        // const id = identifier.current;
        registerPeer(uuid, peerRef);
        return () => unregisterPeer(uuid, peerRef);
    }, [registerPeer, unregisterPeer, peerRef, uuid]);

    // Final context for provider
    const contextValue = useMemo(()=>{
      return ({
        uuid: uuid,
        id: identifier.current,
        name,
        nodeRef: node,
        getRef,

        type, setType,
        data,setData,

        forceUpdate,
        
        ...events,
      })
    },
    [
        uuid,
        identifier,
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
}

PeerManager.whyDidYouRender = false;

export default PeerManager;