import React, { } from 'react'

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { makeStyles } from '@material-ui/core/styles';

import { Canvas } from '@react-three/fiber';

import { clearMenuActive } from './../actions/rt_menu';

const Light = ({ brightness, color }) => {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
};

const FillLight = ({ brightness, color }) => {
  return (
    <rectAreaLight
      width={3}
      height={3}
      intensity={brightness}
      color={color}
      position={[2, 1, 4]}
      lookAt={[0, 0, 0]}
      penumbra={2}
      castShadow
    />
  );
};

const RimLight = ({ brightness, color }) => {
  return (
    <rectAreaLight
      width={2}
      height={2}
      intensity={brightness}
      color={color}
      position={[1, 4, -2]}
      rotation={[0, 180, 0]}
      castShadow
    />
  );
};

const GroundPlane = () => {
  return (
    <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
};

const BackDrop = () => {
  return (
    <mesh receiveShadow position={[0, -1, -5]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
};

const Sphere = () => {
  return (
    <mesh>
      <sphereBufferGeometry args={[0.65, 32, 23]} />
      <meshStandardMaterial color={'gray'} />
    </mesh>
  );
};


function Scene(props) {
  // Deconstruct props from Redux store
  const { clearMenuActive } = props;
  
  // Create local classes
  const classes = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: '100%',
    },
  }))();

  return (
    <Canvas className={classes.root} onClick={()=>{
      // Deselect object when clicking on background
      clearMenuActive();
    }}>
      <Light />
      <FillLight />
      <RimLight />
      <Sphere />
      <BackDrop />
      <GroundPlane />
    </Canvas>
  );
}

const mapStateToProps = state => ({
  ...state,
})

 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    clearMenuActive: clearMenuActive,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scene);
