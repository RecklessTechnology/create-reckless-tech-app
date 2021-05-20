import React, {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import useForceUpdate from './useForceUpdate';
import useAppContext from './useAppContext';
import useStateFromProp from './useStateFromProp';
import createPubSub from './utils/createPubSub';

import GeneratorSwitch from '../generators/generatorSwitch';
import InputSwitch from '../inputs/inputSwitch';

export const RecklessObjectContext = React.createContext(null);

export const DefaultProps = {
    name: 'unnamed',
    position: [0,0,0]
}

export default function RecklessObject({
    name,
    displayName,
    type,
    children,
    ...props
}) {
    const identifier = useRef(Symbol('RecklessObject'));
    const node = useRef(null);
    
    const [registry] = useState(() => new Map());
    const [pubSub] = useState(() => createPubSub());

    const [disabled, setDisabled] = useStateFromProp(props.disabled || false);
    const [debug, setDebug] = useStateFromProp(props.debug || false);

    const [position, setPosition] = useStateFromProp(props.position || [0,0,0]);
    const [rotation, setRotation] = useStateFromProp(props.rotation || [0,0,0]);
    const [scale, setScale] = useStateFromProp(props.scale || 1);
    
    const { registerRecklessObject, unregisterRecklessObject, sceneJSON } = useAppContext();
    const { inputs, generators, connections } = sceneJSON;
    const forceUpdate = useForceUpdate();

    // Functions to register game object with application context
    const registryUtils = useMemo(
        () => ({
            registerComponent(id, api) {
                registry.set(id, api);
            },
            unregisterComponent(id) {
                registry.delete(id);
            },
            getComponent(id) {
                return registry.get(id);
            },
        }),
        [registry]
    );

    // Reference to object properties
    const recklessObjectRef = useMemo(
        () => ({
            id: identifier.current,
            
            name, displayName, type,
            
            disabled, setDisabled,
            debug, setDebug,

            position, setPosition,
            rotation, setRotation,
            scale, setScale,

            getComponent: registryUtils.getComponent,
            subscribe: pubSub.subscribe,
        }),
        [
            name, displayName, type,
            
            disabled, setDisabled,
            debug, setDebug,

            position, setPosition,
            rotation, setRotation,
            scale, setScale,

            registryUtils, pubSub,
        ]
    );

    useMemo(()=>pubSub.publish('disabled-updated', disabled), [disabled, pubSub]);
    useMemo(()=>pubSub.publish('debug-updated', debug), [debug, pubSub]);
    useMemo(()=>pubSub.publish('position-updated', position), [position, pubSub]);
    useMemo(()=>pubSub.publish('rotation-updated', rotation), [rotation, pubSub]);
    useMemo(()=>pubSub.publish('scale-updated', scale), [scale, pubSub]);

    // Callback to fetch properties of object
    const getRef = useCallback(() => recklessObjectRef, [recklessObjectRef]);

    // On load, register object with app context
    useLayoutEffect(() => {
        const id = identifier.current;
        registerRecklessObject(id, recklessObjectRef);
        return () => unregisterRecklessObject(id, recklessObjectRef);
    }, [registerRecklessObject, unregisterRecklessObject, recklessObjectRef]);

    // Final context for provider
    const contextValue = {
        id: identifier.current,
        name,
        nodeRef: node,
        getRef,

        disabled, setDisabled,
        debug, setDebug,

        position, setPosition,
        rotation, setRotation,
        scale, setScale,

        forceUpdate,
        
        ...pubSub,
        ...registryUtils,
    };

    const gens = connections.filter((conn)=>conn.to===props.uuid).map((conn)=>generators.filter((gen)=>gen.uuid===conn.from)[0]).filter(x => x !== undefined);
    const inps = connections.filter((conn)=>conn.to===props.uuid).map((conn)=>inputs.filter((inp)=>inp.uuid===conn.from)[0]).filter(x => x !== undefined);

    return (
        <RecklessObjectContext.Provider value={contextValue}>
            <group name={name} ref={node}>
                {gens.map((gen)=><GeneratorSwitch key={gen.uuid} {...gen} />)}
                {inps.map((inp)=><InputSwitch  key={inp.uuid} {...inp} />)}
                {!disabled ? children : null}
            </group>
        </RecklessObjectContext.Provider>
    );
}
