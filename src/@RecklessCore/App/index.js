import React, {
  useRef,
  Suspense,
  useState,
} from 'react';
import { useFrame } from '@react-three/fiber';

import AppView from './view';
import World from '../World';

import Scene from '../Scenes';
import SceneManager from '../Scenes/Managers/SceneManager';

import useAppContext from './Contexts/useAppContext';
import useEditorMenuContext from '../Editor/Contexts/useEditorMenuContext';
import useInspectorMenuContext from '../Inspector/Contexts/useInspectorMenuContext';

const DynamicScene = React.lazy(() => import('../Scenes/Renderer/Dynamic'));

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
  const { sceneJSON } = useAppContext();
  const { editorMenuHeight, editorMenuOpen, setEditorMenuOpen } = useEditorMenuContext();
  const { inspectorMenuWidth, inspectorMenuOpen, setInspectorMenuOpen } = useInspectorMenuContext();

  if (sceneJSON === undefined) return false;

  return (
    <AppView {...{
      editorMenuOpen,
      editorMenuHeight,
      setEditorMenuOpen,
      inspectorMenuOpen,
      inspectorMenuWidth,
      setInspectorMenuOpen,
      sceneJSON,
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
