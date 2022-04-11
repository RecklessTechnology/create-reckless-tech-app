import PropTypes from 'prop-types';

import React, { createElement, memo } from 'react';

import { Canvas } from '@react-three/fiber';
import { makeStyles } from '@material-ui/core';
import { OrbitControls } from '@react-three/drei';

import { ThreeParamsToArgs } from '../Utils/threeParams';

import useAppContext from '../App/Contexts/useAppContext';

import WorldManager from './Managers/WorldManager';

import MediaPlayers from '../MediaPlayers/Providers/index';
import Generators from '../Generators/Providers/index';
import Peers from '../Peers/Providers/index';
import Devices from '../Devices/Providers/index';
import Transforms from '../Transforms/Providers/index';

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
    object, camera, generators, peers, devices, transforms, mediaPlayers,
  } = sceneJSON;

  const classes = useStyles();

  if (object === undefined) {
    return (
      <div className={classes.root}>
        <MediaPlayers {...{ players: mediaPlayers }} />
        <Generators {...{ generators }} />
        <Peers {...{ peers }} />
        <Devices {...{ devices }} />
        <Transforms {...{ transforms }} />
      </div>
    );
  }

  switch (object.type.toLowerCase()) {
    default:
      return (
        <div className={classes.root} />
      );
    case 'scene':
      return (
        <div className={classes.root}>
          <Canvas
            shadows
            camera={camera}
            // eslint-disable-next-line no-undef
            dpr={window.devicePixelRatio}
          >
            <WorldManager>
              <MediaPlayers {...{ players: mediaPlayers }} />
              <Generators {...{ generators }} />
              <Peers {...{ peers }} />
              <Devices {...{ devices }} />
              <Transforms {...{ transforms }} />
              {/* FOG */}
              {object.fog !== undefined ? createElement(object.fog.type, { type: object.fog.type, attach: 'fog', args: ThreeParamsToArgs(object.fog) }, []) : null}
              {children}
              <OrbitControls enablePan enableZoom enableRotate />
            </WorldManager>
          </Canvas>
        </div>
      );
  }
};

World.propTypes = {
  children: PropTypes.node.isRequired,
};

World.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(World);
