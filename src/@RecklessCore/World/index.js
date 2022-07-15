/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';

import React, {
  createElement,
  memo,
} from 'react';

import { Canvas } from '@react-three/fiber';
import { makeStyles } from '@material-ui/core';
import { OrbitControls } from '@react-three/drei';

import { ThreeParamsToArgs } from '../Utils/threeParams';

// import useAppContext from '../App/Contexts/useAppContext';

import WorldManager from './Managers/WorldManager';

import MediaPlayersProvider from '../MediaPlayers/Providers/index';
import GeneratorsProvider from '../Generators/Providers/index';
import PeersProvider from '../Peers/Providers/index';
import DevicesProvider from '../Devices/Providers/index';
import TransformsProvider from '../Transforms/Providers/index';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    userSelect: 'none',
    width: '100%',
    height: '100%',
  },
}));

const World = ({
  sceneJSON,
  children,
}) => {
  const classes = useStyles();

  const {
    object,
    camera,
    generators, peers, devices, transforms, mediaPlayers,
    connections,
  } = sceneJSON;

  const { type, children: objChildren } = object;

  // eslint-disable-next-line react/prop-types
  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Object Type: ${object.type}`);
      return (
        <div className={classes.root} />
      );
    case 'scene':
      return (
        <div className={classes.root}>
          <MediaPlayersProvider connections={connections} {...{ players: mediaPlayers }} />
          <GeneratorsProvider connections={connections} {...{ generators }} />
          <PeersProvider connections={connections} {...{ peers }} />
          <DevicesProvider connections={connections} {...{ devices }} />
          <TransformsProvider connections={connections} {...{ transforms }} />
          {(objChildren.length > 0)
            ? (
              <Canvas
                // eslint-disable-next-line no-return-assign
                onCreated={({ gl }) => {
                  gl.clippingPlanes = Object.freeze([]);
                  gl.localClippingEnabled = true;
                }}
                style={{ pointerEvents: 'all' }}
                shadows
                camera={camera}
              // eslint-disable-next-line no-undef
                dpr={window.devicePixelRatio}
              >
                <WorldManager>
                  {object.fog !== undefined
                    ? createElement(
                      object.fog.type,
                      {
                        type: object.fog.type,
                        attach: 'fog',
                        args: ThreeParamsToArgs(object.fog),
                      }, [],
                    ) : null}
                  {children}
                  <OrbitControls enablePan enableZoom enableRotate />
                </WorldManager>
              </Canvas>
            ) : null}
        </div>
      );
  }
};

World.propTypes = {
  sceneJSON: PropTypes.shape({
    camera: PropTypes.shape({}).isRequired,
    connections: PropTypes.arrayOf(PropTypes.shape({})),
    object: PropTypes.shape({
      fog: PropTypes.shape({
        type: PropTypes.string,
      }),
      type: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    generators: PropTypes.arrayOf(PropTypes.shape({})),
    peers: PropTypes.arrayOf(PropTypes.shape({})),
    devices: PropTypes.arrayOf(PropTypes.shape({})),
    transforms: PropTypes.arrayOf(PropTypes.shape({})),
    mediaPlayers: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  children: PropTypes.node.isRequired,
};

World.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(World);
