import React, { createElement, memo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { makeStyles } from '@material-ui/core';
import { OrbitControls } from '@react-three/drei';

import { ThreeParamsToArgs } from '../utils/threeParams';

import useAppContext from '../contexts/useAppContext';

import WorldManager from '../managers/WorldManager';
import CameraView from '../components/@views/CameraView';

import Generators from '../inputs/generators/index';
import Peers from '../inputs/peers/index';
import Devices from '../inputs/devices/index';
import Transforms from '../inputs/transforms/index';

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
  const { object, camera, generators, peers, devices, transforms } = sceneJSON;
  
  const { fog } = object;
  const classes = useStyles();

  console.log('world render', object.type);
  switch(object.type) {
    case 'Camera':
      return (<div className={classes.root}>
        <WorldManager>
          {/* <Generators {...{generators, connections}}></Generators> */}
          {/* <Peers {...{peers, connections}}></Peers> */}
          {/* <Devices {...{devices, connections}}></Devices> */}
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
              <Generators {...{generators: generators}}></Generators>
              <Peers {...{peers: peers}}></Peers>
              <Devices {...{devices: devices}}></Devices>
              <Transforms {...{transforms: transforms}}></Transforms>
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