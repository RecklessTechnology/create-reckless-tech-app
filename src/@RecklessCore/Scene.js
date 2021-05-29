import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    createContext,
} from 'react';
import { createPortal } from '@react-three/fiber';
import useAppContext from './useAppContext';
import useSceneManager from './useSceneManager';

const SceneContext = createContext(null);

export function useScene() {
    return useContext(SceneContext);
}

export const LevelContext = React.createContext(null);

export function useLevel() {
    return useContext(LevelContext);
}

// max ms delay between scene init and ready events
// const sceneReadyTimeout = 1000;

export default function Scene({ id, children }) {
    const { publish, sceneJSON } = useAppContext();
    const {
        currentScene,
        currentLevel,
        prevLevel,
        resetScene,
        setLevel,
    } = useSceneManager();
    const [instances, setInstances] = useState([]);
    const idleCallback = useRef();

    const initEvents = useCallback(async () => {
        
        // await publish('scene-init', id);
        // // ensure everything is ready on next idle callback
        // idleCallback.current = window.requestIdleCallback(
        //     () => {
        //         // console.log('scene-ready', id);
        //         publish('scene-ready', id);
        //     },
        //     { timeout: sceneReadyTimeout }
        // );
    }, [publish, id]);

    const contextValue = useMemo(
        () => ({
            instantiate(newElement, portalNode) {
                const key = newElement.key == null ? Math.random() : newElement.key;
                const instance = portalNode
                    ? createPortal(newElement, portalNode, null, key)
                    : React.cloneElement(newElement, { key });
                setInstances(current => [...current, instance]);
                return () => {
                    setInstances(current => {
                        return current.filter(elem => elem !== instance);
                    });
                };
            },
            // pass through from scene manager
            currentScene,
            currentLevel,
            prevLevel,
            resetScene,
            setLevel,
            ...sceneJSON.object
        }),
        [currentScene, currentLevel, prevLevel, resetScene, setLevel, sceneJSON]
    );

    const levelContextValue = useMemo(
        () => ({
            level: currentLevel,
            transition: prevLevel < currentLevel ? -1 : 1,
            enterPrevLevel() {
                setLevel(currentLevel - 1);
            },
            enterNextLevel() {
                setLevel(currentLevel + 1);
            },
        }),
        [currentLevel, prevLevel, setLevel]
    );

    useEffect(() => {
        if (currentScene === id) {
            // entering scene
            initEvents();
        } else {
            // leaving scene
            setInstances([]);
        }
        return () => window.cancelIdleCallback(idleCallback.current);
    }, [currentScene, id, initEvents]);

    // skip rendering scene content
    if (!currentScene.startsWith(id)) return null;

    return (
        <SceneContext.Provider value={contextValue}>
            <LevelContext.Provider value={levelContextValue}>
                <group>
                    {/* just to ensure node.parent in a GO still remains within the scene */}
                    <group>
                        <>{children}</>
                        <>{instances}</>
                    </group>
                </group>
            </LevelContext.Provider>
        </SceneContext.Provider>
    );
}
