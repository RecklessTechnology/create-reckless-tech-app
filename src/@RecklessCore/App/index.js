import {
  useGLTF,
  Merged,
} from '@react-three/drei';

import React, {
  // useEffect,
  useMemo,
  useRef,
  useState,
  // useCallback,
  Suspense,
  memo,
} from 'react';

// import {
//   Plane,
// } from 'three';

import { useFrame } from '@react-three/fiber';

import AppView from './view';
import World from '../World';

import Scene from '../Scenes';
import SceneManager from '../Scenes/Managers/SceneManager';

import useAppContext from './Contexts/useAppContext';
import useEditorMenuContext from '../Editor/Contexts/useEditorMenuContext';
import useInspectorMenuContext from '../Inspector/Contexts/useInspectorMenuContext';

// import LoadingSphere from './Loading/Sphere';
// import EdgeIntersections from './Loading/EdgeIntersections';
// import ClippingEdge from './Loading/ClippingEdge';
import GeoSlicer from '../ThreeObjects/Components/GeoSlicer';

const DynamicScene = React.lazy(() => import('../Scenes/Renderer/Dynamic'));

// const url = 'gltf/lion_skull/scene.gltf';
// const url = 'gltf/CesiumMan/gLTF/CesiumMan.gltf';
// const url = ;
// const url = 'gltf/violin_color/scene.gltf';
// const url = 'gltf/Soldier.glb';

const Box = (props) => (
  <mesh {...props}>
    <meshBasicMaterial wireframe />
    <boxGeometry args={[1, 1, 1]} />
  </mesh>
);

// eslint-disable-next-line react/prop-types
const LoadedObj = memo(({ url, ...props }) => {
  const { nodes } = useGLTF(url, true);

  const meshes = useMemo(() => Object.values(nodes)
    .filter((n) => (n.type === 'Mesh')), [nodes]);

  return (
    <Merged meshes={meshes}>
      {(Mesh) => <Mesh {...props} />}
    </Merged>
  );
});

const LoadingBox = () => {
  const sliceSpeed = 0.1;
  const [sliceDirection, setSliceDirection] = useState(1);
  const [sliceSize, setSliceSize] = useState(0);
  const groupRef = useRef();

  // const verticalPlane = useMemo(() => {
  //   const p = new Plane();
  //   p.normal.set(1, 0, 0);
  //   return p;
  // }, []);

  // useEffect(() => {
  //   verticalPlane.constant = constant;
  //   // verticalPlane.position.x = constant;
  //   // console.log(verticalPlane);
  // }, [constant, verticalPlane]);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (sliceSize + sliceSpeed >= 1) {
      setSliceDirection(-1);
    }
    if (sliceSize - sliceSpeed <= -1) {
      setSliceDirection(1);
    }

    setSliceSize(sliceSize + (sliceSpeed * sliceDirection));

    // groupRef.current.rotation.y += 0.01565;
  });

  return (
    <group ref={groupRef}>
      {/* <LoadingSphere
        {...props}
        geometry={new SphereGeometry(1, 5, 5)}
        plane={verticalPlane}
      /> */ }
      {/* <EdgeIntersections
        {...props}
        showSource
        showMod
        geometry={new SphereGeometry(1, 5, 5)}
        modGeometry={new BoxGeometry(1.75, 0.01, 1.75)}
        modPosition={[0, -constant, 0]}
      /> */}
      {/* <Suspense fallback={(<Box position={[0, 0, 0]} />)}>
        <ClippingEdge
          {...props}
          showSource
          showMod
          modGeometry={new BoxGeometry(10, 0.1, 10)}
          modPosition={[0, -constant, 1]}
        >
          <LoadedObj constant={constant}
          url="gltf/DamagedHelmet/gLTF/DamagedHelmet.gltf" {...props} />
        </ClippingEdge>
      </Suspense> */}
      <Suspense fallback={(<Box position={[0, 0, 0]} />)}>
        <GeoSlicer
          showSource={false}
          slices={7}
          sliceSize={sliceSize}
        >
          <LoadedObj url="gltf/noh_mask/scene.gltf" rotation={[0, sliceSize, Math.PI / 2]} position={[0, sliceSize, 0]} />
        </GeoSlicer>
      </Suspense>
    </group>
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
            <Suspense fallback={(<LoadingBox />)}>
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
