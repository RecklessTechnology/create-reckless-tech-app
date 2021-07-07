import React, { useCallback, useContext, useRef } from 'react';
import useAppContext from './contexts/useAppContext';
import useAppEvent from './contexts/useAppEvent';
import useThreeObjectContext from './contexts/useThreeObjectContext';
import useSceneManager from './contexts/useSceneManagerContext';
import waitForMs from './utils/waitForMs';

export const StoreContext = React.createContext(null);

export default function useThreeObjectStore(
    key,
    write,
    read,
) {
    const { name, forceUpdate } = useThreeObjectContext();
    const { getState, setState } = useContext(StoreContext);

    const writeCallback = useRef(null);
    writeCallback.current = write;

    const readCallback = useRef(null);
    readCallback.current = read;

    useAppEvent(
        'scene-init',
        () => {
            if (!readCallback.current) {
                return;
            }
            if (!name) {
                // eslint-disable-next-line no-console
                console.error('Attempting to use ThreeObject store without a name.');
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

    useAppEvent('scene-exit', save, [save]);
    useAppEvent('save-game', save, [save]);

    return getState(`${name}.${key}`);
}

export function useThreeObjectStoreValue(key) {
    const { name } = useThreeObjectContext();
    const { getState } = useContext(StoreContext);

    if (!name) {
        // eslint-disable-next-line no-console
        console.error('Attempting to use ThreeObject store without a name.');
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
