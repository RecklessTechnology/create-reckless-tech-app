import React, { createContext, useState, useMemo, useEffect } from 'react';

import * as THREE from 'three';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";

import createPubSub from './@RecklessCore/utils/createPubSub';
import World from './@RecklessCore/World';
import SceneManager from './@RecklessCore/SceneManager';
import Scene from './@RecklessCore/Scene';

import DynamicScene from './scenes/DynamicScene';

import sceneJSON from './scenes/TestScene';

import RTMenu from './rtComponents/rtMenu';

export const AppContext = createContext(null);

const App = ({
  movementDuration = 250,
  cameraZoom = 64,
}) => {
  const [paused, setPaused] = useState(false);
  const [registryById] = useState(() => new Map());
  const [registryByName] = useState(() => new Map());
  const [registryByPos] = useState(() => new Map());
  const [registryByType] = useState(() => new Map());

  const [pubSub] = useState(() => createPubSub());
  
  useEffect(() => {
      return pubSub.subscribe('scene-exit', () => {
          registryById.clear();
          registryByName.clear();
          registryByPos.clear();
          registryByType.clear();
      });
  }, [pubSub, registryById, registryByType, registryByName, registryByPos]);

  const registryUtils = useMemo(
      () => ({
          registerRecklessObject(identifier, ref) {
              // register by id
              registryById.set(identifier, ref);
              // register by name
              registryByName.set(ref.name, ref);
              // register by position
              const { position } = ref;
              const pos = `${position.x},${position.y},${position.z}`;
              const posList = registryByPos.get(pos) || [];
              posList.push(ref);
              registryByPos.set(pos, posList);
          },
          unregisterRecklessObject(identifier, ref) {
              // unregister by id
              registryById.delete(identifier);
              // unregister by name
              registryByName.delete(ref.name);
              // unregister by position
              const { position } = ref;
              const pos = `${position.x},${position.y},${position.z}`;
              const posList = registryByPos.get(pos);
              posList.splice(posList.indexOf(ref), 1);
          },
          findRecklessObjectById(id) {
              return registryById.get(id);
          },
          findRecklessObjectByName(name) {
              return registryByName.get(name);
          },
          findRecklessObjectsByPos(x, y) {
              return registryByPos.get(`${x},${y}`)?.filter(obj => !obj.disabled) || [];
          },
          findRecklessObjectsByLayer(type) {
              return registryByType.get(type)?.filter(obj => !obj.disabled) || [];
          },
          recklessObjectNamesArray() {
            return Array.from(registryByName.keys());
          }
      }),
      [registryById, registryByType, registryByName, registryByPos]
  );

  const contextValue = useMemo(()=>({
    settings: {
        movementDuration,
        cameraZoom,
    },
    paused,
    setPaused,
    registryByName,
    sceneJSON,
    ...registryUtils,
    ...pubSub,
  }), [movementDuration, cameraZoom, paused, setPaused, registryByName, registryUtils, pubSub]);

  // Local CSS classes
  const classes = makeStyles((theme) => ({
    root: {
      backgroundColor: `#${new THREE.Color(contextValue.sceneJSON.object.background).getHexString()}`,
      display: "flex",
      flexFlow: "column",
      height: "100vh"
    },
    grid: {
      width: '100%',
      height: '100%',
    },
    item: {
      width: '100%',
      height: '100%',
    }
  }))();

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0} className={classes.grid}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.item} >
          <World sceneProps={contextValue.sceneJSON.object}>
            <AppContext.Provider value={contextValue}>
                <SceneManager defaultScene="dynamic">
                    <Scene
                      id="dynamic">
                        <DynamicScene sceneJSON={contextValue.sceneJSON} />
                    </Scene>
                </SceneManager>
            </AppContext.Provider>
          </World>
        </Grid>
      </Grid>
      <AppContext.Provider value={contextValue}>
        <RTMenu />
      </AppContext.Provider>
    </div>
  );
}

export default App;
