import React, { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

function GLTFModel(props) {
  const { url, hover, active } = props;
  const { scene } = useLoader(GLTFLoader, url);
  
  // scene.traverse( ( child ) => {
  //   if ( child.isMesh ) {
  //     child.material.color.set( (hover || active) ? 'hotpink' : 'orange' );
  //   }
  // });

  return <primitive object={scene.clone()} />
}

function Box(props) {
  const { hover, active } = props;
  return (
    <mesh>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.3}
          metalness={0.3} color={(hover || active) ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function MeshBuilder(props) {
  // Deconstruct props from Redux store
  const { url, hover, active } = props;
  
  switch (url.split(/[#?]/)[0].split('.').pop().trim()) { // get file extension
    case 'gltf': 
    return (
      <Suspense fallback={null}>
        <GLTFModel url={url} hover={hover} active={active} />
      </Suspense>
    );
    case 'box': 
      return (
        <Box hover={hover} active={active} />
      );
    case 'sphere': 
      return (
        <mesh>
          <sphereBufferGeometry args={[0.65, 32, 23]} />
          <meshStandardMaterial color={(hover || active) ? 'hotpink' : 'orange'} />
        </mesh>
      );
    default:
      return false; 
  }
}


export default MeshBuilder;