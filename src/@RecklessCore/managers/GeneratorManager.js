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

import useGeneratorsContext from '../contexts/useGeneratorsContext';

// import { throttle } from '../utils/throttle';

export const GeneratorContext = React.createContext(null);

export const DefaultProps = {
    name: 'unnamed',
    position: [0,0,0]
}

const GeneratorManager = ({
    children,
    ...props
}) => {
    const identifier = useRef(Symbol('Generator'));
    const node = useRef(null);
    
    const [events] = useState(() => EventsManager());

    const [uuid] = useState(props.uuid);
    const [name] = useState(props.name);
    const [displayName] = useState(props.displayName);
    const [type, setType] = useState(props.type || '');
    const [resolution, setResolution] = useState(props.resolution || 1);
    const [rpm, setRpm] = useState(props.rpm || 1000);
    const [loop, setLoop] = useState(props.loop || true);
    const [paused, setPaused] = useState(props.paused || false);

    const [position, setPosition] = useState(props.position || [0,0,0]);

    // Limit publish events to once every...
    // const broadcastThrottle = 1000/60;
    
    useEffect(() => { events.publish('position-updated', position) }, [position, events]);

    // const throttled = useRef(throttle((newValue) => events.publish('position-updated', position), broadcastThrottle))
    // useEffect(() => throttled.current(position), [position])
    
    const { registerGenerator, unregisterGenerator } = useGeneratorsContext();
    const forceUpdate = useForceUpdate();

    // Reference to object properties
    const generatorRef = useMemo(() => {
      return ({
        uuid: uuid,
        id: identifier.current,
        
        name, displayName,
        
        type, setType,
        resolution, setResolution,
        rpm, setRpm,
        loop, setLoop,
        paused, setPaused,
        position, setPosition,

        subscribe: events.subscribe,
        unsubscribe: events.unsubscribe,
      })
    }, [
      uuid,
      name, displayName,

      type, setType,
      resolution, setResolution,
      rpm, setRpm,
      loop, setLoop,
      paused, setPaused,
      position, setPosition,

      events,
    ]);

    // Callback to fetch properties of object
    const getRef = useCallback(() => generatorRef, [generatorRef]);

    // // On load, register object with app context
    useLayoutEffect(() => {
        // const id = identifier.current;
        registerGenerator(uuid, generatorRef);
        return () => unregisterGenerator(uuid, generatorRef);
    }, [registerGenerator, unregisterGenerator, generatorRef, uuid]);

    // Final context for provider
    const contextValue = useMemo(()=>{
      return ({
        uuid: uuid,
        id: identifier.current,
        name,
        nodeRef: node,
        getRef,

        type, setType,
        resolution, setResolution,
        rpm, setRpm,
        loop, setLoop,
        paused, setPaused,
        position, setPosition,
        
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
        resolution, setResolution,
        rpm, setRpm,
        loop, setLoop,
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
}

GeneratorManager.whyDidYouRender = false;

export default GeneratorManager;