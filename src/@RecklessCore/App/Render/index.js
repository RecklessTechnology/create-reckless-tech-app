import React, {
  useCallback, useEffect, useRef,
  Suspense,
  useState,
} from 'react';
import { useFrame } from '@react-three/fiber';

import AppView from './view';
import World from '../../World/index';

import Scene from '../../Scenes/Render';
import SceneManager from '../../Scenes/Managers/SceneManager';

import useAppContext from '../Contexts/useAppContext';
import useEditorMenuContext from '../../EditorMenu/Contexts/useEditorMenuContext';
import useInspectorMenuContext from '../../InspectorMenu/Contexts/useInspectorMenuContext';

const DynamicScene = React.lazy(() => import('../../Scenes/Render/Dynamic'));

const LoadingBox = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => { mesh.current.rotation.x += 0.01; });

  return (
    <mesh
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 2, 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

const App = () => {
  const {
    subscribe, unsubscribe, sceneJSON, setSceneJSON,
  } = useAppContext();
  const { editorMenuHeight, editorMenuOpen, setEditorMenuOpen } = useEditorMenuContext();
  const { inspectorMenuWidth, inspectorMenuOpen, setInspectorMenuOpen } = useInspectorMenuContext();

  const isMounted = useRef(false);

  const updateScene = useCallback((data) => { // update data only when peer list is modified
    if (isMounted.current) {
      setSceneJSON(data);
    }
  }, [setSceneJSON]);

  useEffect(() => {
    if (sceneJSON !== undefined) {
      isMounted.current = true;
      subscribe('scene-changed', updateScene);
    }
    return () => {
      isMounted.current = false;
      unsubscribe('scene-changed', updateScene);
    };
  }, [isMounted, updateScene, subscribe, unsubscribe, sceneJSON]);

  return (
    <AppView {...{
      editorMenuOpen,
      editorMenuHeight,
      setEditorMenuOpen,
      inspectorMenuOpen,
      inspectorMenuWidth,
      setInspectorMenuOpen,
    }}
    >
      <World {...{ sceneJSON }}>
        <SceneManager {...{ defaultScene: 'dynamic:0' }}>
          <Scene {...{ id: 'dynamic', sceneJSON }}>
            <Suspense fallback={(<LoadingBox position={[1.2, 0, 0]} />)}>
              <DynamicScene {...{ sceneJSON }} />
            </Suspense>
          </Scene>
        </SceneManager>
      </World>
    </AppView>
  );
};

App.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default App;
