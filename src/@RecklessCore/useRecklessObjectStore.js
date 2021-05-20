import React, { useCallback, useContext, useRef } from 'react';
import useAppContext from './useAppContext';
import useGameEvent from './useGameEvent';
import useRecklessObject from './useRecklessObject';
import useSceneManager from './useSceneManager';
import waitForMs from './utils/waitForMs';

export const StoreContext = React.createContext(null);

export default function useRecklessObjectStore(
    key,
    write,
    read,
) {
    const { name, forceUpdate } = useRecklessObject();
    const { getState, setState } = useContext(StoreContext);

    const writeCallback = useRef(null);
    writeCallback.current = write;

    const readCallback = useRef(null);
    readCallback.current = read;

    useGameEvent(
        'scene-init',
        () => {
            if (!readCallback.current) {
                return;
            }
            if (!name) {
                // eslint-disable-next-line no-console
                console.error('Attempting to use RecklessObject store without a name.');
                return;
            }

            const stored = getState(`${name}.${key}`);
            if (stored != null) {
                readCallback.current(stored);
                waitForMs(0).then(forceUpdate);
            }
        },
        [key, name]
    );

    const save = useCallback(async () => {
        if (!name) return;
        setState(`${name}.${key}`, writeCallback.current());
    }, [key, name, setState]);

    useGameEvent('scene-exit', save, [save]);
    useGameEvent('save-game', save, [save]);

    return getState(`${name}.${key}`);
}

export function useRecklessObjectStoreValue(key) {
    const { name } = useRecklessObject();
    const { getState } = useContext(StoreContext);

    if (!name) {
        // eslint-disable-next-line no-console
        console.error('Attempting to use RecklessObject store without a name.');
        return undefined;
    }

    const stored = getState(`${name}.${key}`);
    return stored;
}

export function GameStoreProvider({ children }) {
    const { getGameState, setGameState } = useAppContext();

    const contextValue = {
        getState: getGameState,
        setState: setGameState,
    };

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
}

export function SceneStoreProvider({ children }) {
    const { getSceneState, setSceneState } = useSceneManager();

    const contextValue = {
        getState: getSceneState,
        setState: setSceneState,
    };

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
}
