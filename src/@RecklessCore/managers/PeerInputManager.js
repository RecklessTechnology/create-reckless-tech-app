import React, {
    
} from 'react';
// import useForceUpdate from '../useForceUpdate';
// import EventsManager from '../managers/EventsManager';

// import { throttle } from '../utils/throttle';

export const PeerInputContext = React.createContext(null);

export const DefaultProps = {
    name: 'unnamed',
    position: [0,0,0]
}

const PeerInputManager = ({
    children,
    ...props
}) => {
    // const identifier = useRef(Symbol('Peer'));
    // const node = useRef(null);
    
    // const [events] = useState(() => EventsManager());

    // const [uuid] = useState(props.uuid);
    // const [name] = useState(props.name);
    // const [displayName] = useState(props.displayName);
    // const [type, setType] = useState(props.type || '');
    // const [resolution, setResolution] = useState(props.resolution || 1);
    // const [rpm, setRpm] = useState(props.rpm || 1000);
    // const [loop, setLoop] = useState(props.loop || true);
    // const [paused, setPaused] = useState(props.paused || false);

    // const [position, setPosition] = useState(props.position || [0,0,0]);

    // Limit publish events to once every...
    // const broadcastThrottle = 1000/60;
    
    // useEffect(() => { events.publish('data-updated', data) }, [position, events]);

    // const throttled = useRef(throttle((newValue) => events.publish('position-updated', position), broadcastThrottle))
    // useEffect(() => throttled.current(position), [position])
    
    // const { registerPeer, unregisterPeer } = usePeersContext();
    // const forceUpdate = useForceUpdate();

    // Reference to object properties
    // const peerRef = useMemo(() => {
    //   return ({
    //     uuid: uuid,
    //     id: identifier.current,
        
    //     name, displayName,
        
    //     type, setType,
    //     resolution, setResolution,
    //     rpm, setRpm,
    //     loop, setLoop,
    //     paused, setPaused,
    //     position, setPosition,

    //     subscribe: events.subscribe,
    //     unsubscribe: events.unsubscribe,
    //   })
    // }, [
    //   uuid,
    //   name, displayName,

    //   type, setType,
    //   resolution, setResolution,
    //   rpm, setRpm,
    //   loop, setLoop,
    //   paused, setPaused,
    //   position, setPosition,

    //   events,
    // ]);

    // // Callback to fetch properties of object
    // const getRef = useCallback(() => peerRef, [peerRef]);

    // // // On load, register object with app context
    // useLayoutEffect(() => {
    //     // const id = identifier.current;
    //     registerPeer(uuid, peerRef);
    //     return () => unregisterPeer(uuid, peerRef);
    // }, [registerPeer, unregisterPeer, peerRef, uuid]);

    // // Final context for provider
    // const contextValue = useMemo(()=>{
    //   return ({
    //     uuid: uuid,
    //     id: identifier.current,
    //     name,
    //     nodeRef: node,
    //     getRef,

    //     type, setType,
    //     resolution, setResolution,
    //     rpm, setRpm,
    //     loop, setLoop,
    //     paused, setPaused,
    //     position, setPosition,
        
    //     forceUpdate,
        
    //     ...events,
    //   })
    // },
    // [
    //     uuid,
    //     identifier,
    //     name,
    //     node,
    //     getRef,
        
    //     type, setType,
    //     resolution, setResolution,
    //     rpm, setRpm,
    //     loop, setLoop,
    //     paused, setPaused,
    //     position, setPosition,

    //     forceUpdate,
    //     events,
    //   ]);

    return (
        <PeerInputContext.Provider value={{}}>
          {children}
        </PeerInputContext.Provider>
    );
}

PeerInputManager.whyDidYouRender = false;

export default PeerInputManager;