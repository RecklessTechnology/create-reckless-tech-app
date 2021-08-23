/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { createElement, memo } from 'react';

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

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    userSelect: 'none',
    width: '100%',
    height: '100%',
  },
}));

const World = ({
  children,
}) => {
  const { sceneJSON } = useAppContext();
  const {
    object, camera, generators, peers, devices, transforms,
  } = sceneJSON;

  const { fog } = object;
  const classes = useStyles();

  switch (object.type) {
    case 'Camera':
      return (
        <div className={classes.root}>
          <WorldManager>
            <CameraView />
          </WorldManager>
        </div>
      );
    default:
    case 'Scene':
      return (
        <div className={classes.root}>
          <Canvas
            shadows
            camera={camera}
            dpr={window.devicePixelRatio}
          >
            <WorldManager>
              <Generators {...{ generators: generators }} />
              <Peers {...{ peers: peers }} />
              <Devices {...{ devices: devices }} />
              <Transforms {...{ transforms: transforms }} />
              {/* FOG */}
              {fog !== undefined ? createElement(fog.type, { type: fog.type, attach: 'fog', args: ThreeParamsToArgs(fog) }, []) : null}
              {children}
              <OrbitControls enablePan enableZoom enableRotate />
            </WorldManager>
          </Canvas>
        </div>
      );
  }
};

World.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

World.whyDidYouRender = true;

export default memo(World);
