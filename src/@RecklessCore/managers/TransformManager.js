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

import useAppContext from '../contexts/useAppContext';
import useGeneratorsContext from '../contexts/useGeneratorsContext';
import useDevicesContext from '../contexts/useDevicesContext';
import useTransformsContext from '../contexts/useTransformsContext';

// import { throttle } from '../utils/throttle';

export const TransformContext = React.createContext(null);

export const DefaultProps = {
    name: 'unnamed',
    position: [0,0,0]
}

const TransformManager = ({
    children,
    ...props
}) => {
    const isMounted = useRef(false);

    
    const identifier = useRef(Symbol('Transform'));
    const node = useRef(null);
    
    const [events] = useState(() => EventsManager());

    const [uuid] = useState(props.uuid);
    const [name] = useState(props.name);
    const [displayName] = useState(props.displayName);
    const [type, setType] = useState(props.type || '');

    const [value, setValue] = useState(props.data || [0,0,0]);

    // Outputs

    // Limit publish events to once every...
    // const broadcastThrottle = 1000/60;
    
    useEffect(() => { events.publish('value-updated', value) }, [value, events]);

    // const throttled = useRef(throttle((newValue) => events.publish('position-updated', position), broadcastThrottle))
    // useEffect(() => throttled.current(position), [position])
    
    const { registerTransform, unregisterTransform } = useTransformsContext();
    const forceUpdate = useForceUpdate();

    // Reference to object properties
    const peerRef = useMemo(() => {
      return ({
        uuid: uuid,
        id: identifier.current,
        
        name, displayName,
        
        type, setType,
        
        value, setValue,

        subscribe: events.subscribe,
        unsubscribe: events.unsubscribe,
      })
    }, [
      uuid,
      name, displayName,

      type, setType,
      
      value, setValue,

      events,
    ]);

    // Callback to fetch properties of object
    const getRef = useCallback(() => peerRef, [peerRef]);

    // // On load, register object with app context
    useLayoutEffect(() => {
        // const id = identifier.current;
        registerTransform(uuid, peerRef);
        return () => unregisterTransform(uuid, peerRef);
    }, [registerTransform, unregisterTransform, peerRef, uuid]);

    // Final context for provider
    const contextValue = useMemo(()=>{
      return ({
        uuid: uuid,
        id: identifier.current,
        name,
        nodeRef: node,
        getRef,

        type, setType,
        value,setValue,

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
        value, setValue,

        forceUpdate,
        events,
      ]);

    return (
        <TransformContext.Provider value={contextValue}>
          {children}
        </TransformContext.Provider>
    );
}

TransformManager.whyDidYouRender = false;

export default TransformManager;