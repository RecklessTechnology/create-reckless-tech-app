import PropTypes from 'prop-types';

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  createContext,
} from 'react';
import { createPortal } from '@react-three/fiber';
import useSceneManager from './Contexts/useSceneManagerContext';

const SceneContext = createContext(null);
SceneContext.displayName = 'Scene Context';

export function useScene() {
  return useContext(SceneContext);
}

export const LevelContext = createContext(null);
LevelContext.displayName = 'Level Context';

export function useLevel() {
  return useContext(LevelContext);
}

const Scene = ({ id, sceneJSON, children }) => {
  const {
    currentScene,
    currentLevel,
    prevLevel,
    resetScene,
    setLevel,
  } = useSceneManager();
  const { object } = sceneJSON;
  const [instances, setInstances] = useState([]);
  // const idleCallback = useRef();

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
  }, [/* publish, id */]);

  const contextValue = useMemo(
    () => ({
      instantiate(newElement, portalNode) {
        const key = newElement.key == null ? Math.random() : newElement.key;
        const instance = portalNode
          ? createPortal(newElement, portalNode, null, key)
          : React.cloneElement(newElement, { key });
        setInstances((current) => [...current, instance]);
        return () => {
          setInstances((current) => current.filter((elem) => elem !== instance));
        };
      },
      // pass through from scene manager
      currentScene,
      currentLevel,
      prevLevel,
      resetScene,
      setLevel,
      ...object,
    }),
    [currentScene, currentLevel, prevLevel, resetScene, setLevel, object],
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
    [currentLevel, prevLevel, setLevel],
  );

  useEffect(() => {
    // const cur = idleCallback.current;
    if (currentScene === id) {
      // entering scene
      initEvents();
    } else {
      // leaving scene
      setInstances([]);
    }
    // return () => window.cancelIdleCallback(cur);
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
};

Scene.propTypes = {
  id: PropTypes.string.isRequired,
  sceneJSON: PropTypes.shape({
    object: PropTypes.shape({}),
  }).isRequired,
  children: PropTypes.node.isRequired,
};

Scene.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default Scene;
