import React, {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import useForceUpdate from './useForceUpdate';
import useAppContext from './useAppContext';
import createPubSub from './utils/createPubSub';

import Generators from '../generators/Generators';
import Inputs from '../inputs/Inputs';

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
    
    const [uuid] = useState(props.uuid);
    const [registry] = useState(() => new Map());
    const [pubSub] = useState(() => createPubSub());

    const [disabled, setDisabled] = useState(props.disabled || false);
    const [debug, setDebug] = useState(props.debug || false);

    const [position, setPosition] = useState(props.position || [0,0,0]);
    const [rotation, setRotation] = useState(props.rotation || [0,0,0]);
    const [scale, setScale] = useState(props.scale || 1);
    
    const { registerRecklessObject, unregisterRecklessObject } = useAppContext();
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
            uuid: uuid,
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
            uuid,
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

    // // On load, register object with app context
    useLayoutEffect(() => {
        const id = identifier.current;
        registerRecklessObject(id, recklessObjectRef);
        return () => unregisterRecklessObject(id, recklessObjectRef);
    }, [registerRecklessObject, unregisterRecklessObject, recklessObjectRef]);

    // Final context for provider
    const contextValue = useMemo(()=>({
        uuid: uuid,
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
    }), [
        uuid,
        identifier,
        name,
        node,
        getRef,
        disabled, setDisabled,
        debug, setDebug,
        position, setPosition,
        rotation, setRotation,
        scale, setScale,
        forceUpdate,
        pubSub,
        registryUtils,
    ]);

    return (
        <RecklessObjectContext.Provider value={contextValue}>
            <group name={name} ref={node}>
                <Generators />
                <Inputs />
                {!disabled ? children : null}
            </group>
        </RecklessObjectContext.Provider>
    );
}
