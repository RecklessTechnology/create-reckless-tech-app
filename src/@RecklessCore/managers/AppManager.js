/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */

import PropTypes from 'prop-types';

import React, {
  createContext,
  useMemo,
  useState,
  useCallback,
} from 'react';

import { v4 as uuidv4 } from 'uuid';

import EventsManager from './EventsManager';
import DefaultSceneJSON from '../sceneDefinitions/LogoScene.json';
import DefaultSceneJSONClient from '../sceneDefinitions/TestScene.json';

export const AppContext = createContext(null);
// eslint-disable-next-line import/no-mutable-exports
export let appContextValue = {};

const AppManager = ({
  children,
}) => {
  const [sceneJSON, setSceneJSON] = useState(() => {
    if (window.location.hash.substr(1) === '') {
      return DefaultSceneJSON;
    }
    return DefaultSceneJSONClient;
  });

  const [paused, setPaused] = useState(false);

  const [events] = useState(() => EventsManager());

  const getDefaultGeo = (geoUUID, type) => ({
    uuid: geoUUID,
    type: `${type}Geometry`,
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  });

  const getDefaultMat = (materialUUID) => ({
    uuid: materialUUID,
    type: 'MeshStandardMaterial',
    color: 16777215,
    roughness: 1,
    metalness: 0,
    emissive: 0,
    envMapIntensity: 1,
    refractionRatio: 0.98,
    depthFunc: 3,
    depthTest: true,
    depthWrite: true,
    colorWrite: true,
    stencilWrite: false,
    stencilWriteMask: 255,
    stencilFunc: 519,
    stencilRef: 0,
    stencilFuncMask: 255,
    stencilFail: 7680,
    stencilZFail: 7680,
    stencilZPass: 7680,
  });

  const removeChild = useCallback((childs, uuid, callback) => {
    childs.forEach((child, idx) => {
      if (child.uuid === uuid) {
        childs.splice(idx, 1);
        callback();
      } else if (child.children !== undefined) {
        removeChild(child.children, uuid, callback);
      }
    });
  }, []);

  // Add, remove, and update objects from the scene json
  const sceneUtils = useMemo(() => ({
    removeTransform(uuid) {
      setSceneJSON({
        ...sceneJSON,
        transforms: [
          ...sceneJSON.transforms.filter((t) => (t.uuid !== uuid)),
        ],
        connections: [
          ...sceneJSON.connections.filter((c) => (c.from !== uuid && c.to !== uuid)),
        ],
      });
    },
    addTransform(type) {
      setSceneJSON({
        ...sceneJSON,
        transforms: [
          ...sceneJSON.transforms,
          {
            uuid: uuidv4(),
            type,
            name: `new ${type}`,
            amount: 2,
          },
        ],
      });
    },
    removeDevice(uuid) {
      setSceneJSON({
        ...sceneJSON,
        devices: [
          ...sceneJSON.devices.filter((d) => (d.uuid !== uuid)),
        ],
        connections: [
          ...sceneJSON.connections.filter((c) => (c.from !== uuid && c.to !== uuid)),
        ],
      });
    },
    addDevice(type) {
      setSceneJSON({
        ...sceneJSON,
        devices: [
          ...sceneJSON.devices,
          {
            uuid: uuidv4(),
            type,
            name: `new ${type}`,
          },
        ],
      });
    },
    removeGenerator(uuid) {
      setSceneJSON({
        ...sceneJSON,
        generators: [
          ...sceneJSON.generators.filter((g) => (g.uuid !== uuid)),
        ],
        connections: [
          ...sceneJSON.connections.filter((c) => (c.from !== uuid && c.to !== uuid)),
        ],
      });
    },
    addGenerator(type) {
      setSceneJSON({
        ...sceneJSON,
        generators: [
          ...sceneJSON.generators,
          {
            uuid: uuidv4(),
            type,
            name: `new ${type}`,
            resolution: 32,
            rpm: 30,
            loop: true,
            paused: false,
          },
        ],
      });
    },
    removeThreeObj(uuid) {
      const filterdChildren = sceneJSON.object.children;
      removeChild(filterdChildren, uuid, () => {
        setSceneJSON({
          ...sceneJSON,
          object: {
            ...sceneJSON.object,
            children: filterdChildren,
          },
        });
      });
    },
    addThreeObj(type) {
      const geoUUID = uuidv4();
      const materialUUID = uuidv4();
      setSceneJSON({
        ...sceneJSON,
        geometries: [
          ...sceneJSON.geometries,
          getDefaultGeo(geoUUID, type),
        ],
        materials: [
          ...sceneJSON.materials,
          getDefaultMat(materialUUID),
        ],
        object: {
          ...sceneJSON.object,
          children: [
            ...sceneJSON.object.children,
            {
              uuid: uuidv4(),
              type: 'Mesh',
              name: type,
              layers: 1,
              matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
              geometry: geoUUID,
              material: materialUUID,
            },
          ],
        },
      });
    },
    // Peers
    updatePeer(uuid, ref) {
      setSceneJSON({
        ...sceneJSON,
        peers: [
          ...sceneJSON.peers,
          ...ref,
        ],
      });
    },
    removePeer(uuid) {
      setSceneJSON({
        ...sceneJSON,
        peers: [
          ...sceneJSON.peers.filter((p) => (p.uuid !== uuid)),
        ],
        connections: [
          ...sceneJSON.connections.filter((c) => (c.from !== uuid && c.to !== uuid)),
        ],
      });
    },
    addPeer(uuid) {
      setSceneJSON({
        ...sceneJSON,
        peers: [
          ...sceneJSON.peers,
          {
            type: 'peer',
            name: uuid,
            uuid,
          },
        ],
      });
    },
    // Connections
    addConnection(edge) {
      setSceneJSON({
        ...sceneJSON,
        connections: [
          ...sceneJSON.connections,
          {
            uuid: uuidv4(),
            from: edge.source,
            fromProp: edge.sourceHandle.replace(edge.source, '').split('-')[1].toLowerCase(),
            to: edge.target,
            toProp: edge.targetHandle.replace(edge.target, '').split('-')[2].toLowerCase(),
          },
        ],
      });
    },
    updateConnection(oldEdge, newConnection) {
      setSceneJSON({
        ...sceneJSON,
        connections: [
          ...(sceneJSON.connections.filter((con) => (con.uuid !== oldEdge.id))
            ? sceneJSON.connections.filter((con) => (con.uuid !== oldEdge.id)) : []),
          {
            uuid: oldEdge.id,
            from: newConnection.source,
            fromProp: newConnection.sourceHandle.replace(newConnection.source, '').split('-')[1],
            to: newConnection.target,
            toProp: newConnection.targetHandle.replace(newConnection.target, '').split('-')[2],
          },
        ],
      });
    },
  }), [sceneJSON, setSceneJSON, removeChild]);

  appContextValue = useMemo(() => ({
    settings: {
    },
    paused,
    setPaused,
    sceneJSON,
    setSceneJSON,
    ...events,
    ...sceneUtils,
  }), [
    paused, setPaused,
    sceneJSON, setSceneJSON,
    events,
    sceneUtils,
  ]);

  return (<AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>);
};

AppManager.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default AppManager;
