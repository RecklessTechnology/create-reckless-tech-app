import React, { useState, } from 'react'

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { makeStyles } from '@material-ui/core/styles';

import { Canvas } from '@react-three/fiber'

import Draggable from './Draggable';
import MeshBuilder from './MeshBuilder';

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


function Scene(props) {
  // Deconstruct props from Redux store
  const { objs, clearActive, updateActive, updateHover, updateRotation, updatePosition } = props;
  
  // Create local classes
  const classes = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: '100%',
    },
  }))();

  const SphereParent = objs.filter((o) => (o.id === 'Sphere Parent'))[0];
  const SphereChild = objs.filter((o) => (o.id === 'Sphere Child'))[0];
  const SphereGrandchild = objs.filter((o) => (o.id === 'Sphere Grandchild'))[0];

  return (
    <Canvas className={classes.root} onClick={()=>{
      // Deselect object when clicking on background
      if (objs.filter((o)=>{ return o.hover === true}).length === 0) {
        clearActive();
      }
    }}>
      <Light />
      <FillLight />
      <RimLight />
      {
        objs.map((o)=>{
          if (o.url !== 'sphere') {
            return (
              <Draggable
                key={o.id}

                name={o.id}
                
                active={o.active}
                
                updateActive={updateActive}
                updateHover={updateHover}
                updateRotation={updateRotation}
                updatePosition={updatePosition}
                
                position={o.position}
                rotation={o.rotation}
                scale={o.scale}

                responsiveness={o.responsiveness}
              >
                <MeshBuilder url={o.url} hover={o.hover} active={o.active} />
              </Draggable>);
          }
        })
      }
      <Draggable
        key={SphereParent.id}

        name={SphereParent.id}
        
        active={SphereParent.active}
        
        updateActive={updateActive}
        updateHover={updateHover}
        updateRotation={updateRotation}
        updatePosition={updatePosition}
        
        position={SphereParent.position}
        rotation={SphereParent.rotation}
        scale={SphereParent.scale}

        responsiveness={SphereParent.responsiveness}
      >
        <MeshBuilder url={SphereParent.url} hover={SphereParent.hover} active={SphereParent.active} />
        <Draggable
          key={SphereChild.id}

          name={SphereChild.id}
          
          active={SphereChild.active}
          
          updateActive={updateActive}
          updateHover={updateHover}
          updateRotation={updateRotation}
          updatePosition={updatePosition}
          
          position={SphereChild.position}
          rotation={SphereChild.rotation}
          scale={SphereChild.scale}

          responsiveness={SphereChild.responsiveness}
        >
          <MeshBuilder url={SphereChild.url} hover={SphereChild.hover} active={SphereChild.active} />
          <Draggable
            key={SphereGrandchild.id}

            name={SphereGrandchild.id}
            
            active={SphereGrandchild.active}
            
            updateActive={updateActive}
            updateHover={updateHover}
            updateRotation={updateRotation}
            updatePosition={updatePosition}
            
            position={SphereGrandchild.position}
            rotation={SphereGrandchild.rotation}
            scale={SphereGrandchild.scale}

            responsiveness={SphereGrandchild.responsiveness}
          >
            <MeshBuilder url={SphereGrandchild.url} hover={SphereGrandchild.hover} active={SphereGrandchild.active} />
          </Draggable>
        </Draggable>
      </Draggable>
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scene);
