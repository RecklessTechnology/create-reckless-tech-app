import React, { createElement, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { makeStyles } from '@material-ui/core';
import { OrbitControls } from '@react-three/drei';

import { ThreeParamsToArgs } from '../utils/threeParams';

import useAppContext from '../contexts/useAppContext';

import WorldManager from '../managers/WorldManager';
import CameraView from '../components/@views/CameraView';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    userSelect: 'none',
    width: '100%',
    height: '100%',
  },
}));

const World = ({
  children,
  ...props
}) => {
  const { sceneJSON } = useAppContext();

  const { object, camera } = sceneJSON;
  const { fog } = object;
  const classes = useStyles();

  console.log('world render', object.type);
  switch(object.type) {
    case 'Camera':
      return (<div className={classes.root}>
        <WorldManager>
          <CameraView/>
        </WorldManager>
      </div>);
    default:
    case 'Scene':
      return (
        <div className={classes.root}>
          <Canvas
            // mode="concurrent"
            shadows
            camera={camera}
            dpr={window.devicePixelRatio}
            {...props}
          >
            <WorldManager>
            {/* FOG */}
            {fog !== undefined ? createElement(fog.type, { type: fog.type, attach: "fog", args: ThreeParamsToArgs(fog) }, [] ) : null}
            {children}
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </WorldManager>
          </Canvas>
        </div>
      );
  }
}

export default memo(World);