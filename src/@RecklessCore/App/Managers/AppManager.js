import PropTypes from 'prop-types';

import React, {
  createContext,
  useMemo,
  useState,
  useCallback,
} from 'react';

import { v4 as uuidv4 } from 'uuid';

import EventsManager from '../../Events/Managers/EventsManager';

export const AppContext = createContext(null);
AppContext.displayName = 'App Context';

// eslint-disable-next-line import/no-mutable-exports
export let appContextValue = {};

const AppManager = ({
  sceneJSON: passedScene,
  children,
}) => {
  const [sceneJSON, setSceneJSON] = useState(passedScene);

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

  const hideChild = useCallback((childs, uuid, val, callback) => {
    childs.forEach((c) => {
      const { uuid: uid, userData, children: cChildren } = c;
      if (uid === uuid) {
        // eslint-disable-next-line no-param-reassign
        userData.isPatchHidden = val;
        callback();
      } else if (cChildren !== undefined) {
        hideChild(cChildren, uuid, val, callback);
      }
    });
  }, []);

  const removeChild = useCallback((childs, uuid, callback) => {
    childs.forEach((c, idx) => {
      const { uuid: uid, children: cChildren } = c;
      if (uid === uuid) {
        const child = childs.splice(idx, 1);
        callback(child);
      } else if (cChildren !== undefined) {
        removeChild(cChildren, uuid, callback);
      }
    });
  }, []);

  // Add, remove, and update objects from the scene json
  const sceneUtils = useMemo(() => ({
    // Media Players
    hideMediaPlayer(uuid) {
      setSceneJSON({
        ...sceneJSON,
        mediaPlayers: [
          ...sceneJSON.mediaPlayers.filter((d) => (d.uuid !== uuid)),
          {
            ...sceneJSON.mediaPlayers.filter((d) => (d.uuid === uuid))[0],
            userData: {
              ...sceneJSON.mediaPlayers.filter((d) => (d.uuid === uuid))[0].userData,
              isPatchHidden: true,
            },
          },
        ],
      });
    },
    removeMediaPlayer(uuid) {
      setSceneJSON({
        ...sceneJSON,
        mediaPlayers: [
          ...sceneJSON.mediaPlayers.filter((d) => (d.uuid !== uuid)),
        ],
        connections: [
          ...sceneJSON.connections.filter(
            (c) => (c.from !== uuid && c.to !== uuid),
          ),
        ],
      });
    },
    addMediaPlayer(type) {
      setSceneJSON({
        ...sceneJSON,
        mediaPlayers: [
          ...sceneJSON.mediaPlayers,
          {
            uuid: uuidv4(),
            type,
            name: `new ${type}`,
            isPlaying: false,
            trackProgress: 0,
            trackIndex: 0,
            tracks: [],
            userData: {
              isPatchHidden: false,
            },
          },
        ],
      });
    },
    // Widgets
    hideWidget(uuid) {
      setSceneJSON({
        ...sceneJSON,
        widgets: [
          ...sceneJSON.widgets.filter((d) => (d.uuid !== uuid)),
          {
            ...sceneJSON.widgets.filter((d) => (d.uuid === uuid))[0],
            userData: {
              ...sceneJSON.widgets.filter((d) => (d.uuid === uuid))[0].userData,
              isPatchHidden: true,
            },
          },
        ],
      });
    },
    removeWidget(uuid) {
      setSceneJSON({
        ...sceneJSON,
        widgets: [
          ...sceneJSON.widgets.filter((d) => (d.uuid !== uuid)),
        ],
        connections: [
          ...sceneJSON.connections.filter(
            (c) => (c.from !== uuid && c.to !== uuid),
          ),
        ],
      });
    },
    addWidget(type) {
      setSceneJSON({
        ...sceneJSON,
        widgets: [
          ...sceneJSON.widgets,
          {
            uuid: uuidv4(),
            type,
            name: `new ${type}`,
            size: 0,
            location: 0,
            userData: {
              isPatchHidden: false,
            },
          },
        ],
      });
    },
    // Transforms
    hideTransform(uuid) {
      setSceneJSON({
        ...sceneJSON,
        transforms: [
          ...sceneJSON.transforms.filter((d) => (d.uuid !== uuid)),
          {
            ...sceneJSON.transforms.filter((d) => (d.uuid === uuid))[0],
            userData: {
              ...sceneJSON.transforms.filter((d) => (d.uuid === uuid))[0].userData,
              isPatchHidden: true,
            },
          },
        ],
      });
    },
    removeTransform(uuid) {
      const obj = {
        ...sceneJSON,
        transforms: [
          ...sceneJSON.transforms.filter((t) => (t.uuid !== uuid)),
        ],
        connections: [
          ...sceneJSON.connections.filter(
            (c) => (c.from !== uuid && c.to !== uuid),
          ),
        ],
      };
      setSceneJSON(obj);
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
            userData: {
              isPatchHidden: false,
            },
          },
        ],
      });
    },
    // Devices
    hideDevice(uuid) {
      setSceneJSON({
        ...sceneJSON,
        devices: [
          ...sceneJSON.devices.filter((d) => (d.uuid !== uuid)),
          {
            ...sceneJSON.devices.filter((d) => (d.uuid === uuid))[0],
            userData: {
              ...sceneJSON.devices.filter((d) => (d.uuid === uuid))[0].userData,
              isPatchHidden: true,
            },
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
          ...sceneJSON.connections.filter(
            (c) => (c.from !== uuid && c.to !== uuid),
          ),
        ],
      });
    },
    addDevice(type) {
      const deviceUUID = uuidv4();
      let newJSON = {
        ...sceneJSON,
        devices: [
          ...sceneJSON.devices,
          {
            uuid: deviceUUID,
            type,
            name: `new ${type}`,
            userData: {
              isPatchHidden: false,
            },
          },
        ],
      };
      if (type === 'camera') {
        // Show Preview
        const previewUUID = uuidv4();
        newJSON = {
          ...newJSON,
          widgets: [
            ...sceneJSON.widgets,
            {
              uuid: previewUUID,
              type: 'Preview',
              name: 'new preview',
              size: 'small',
              location: 'top-right',
              userData: {
                isPatchHidden: false,
              },
            },
          ],
          connections: [
            ...sceneJSON.connections,
            {
              uuid: uuidv4(),
              from: deviceUUID,
              fromProp: 'mediastream',
              to: previewUUID,
              toProp: 'mediastream',
            },
          ],
        };
      }
      setSceneJSON(newJSON);
    },
    // Generators
    hideGenerator(uuid) {
      setSceneJSON({
        ...sceneJSON,
        generators: [
          ...sceneJSON.generators.filter((d) => (d.uuid !== uuid)),
          {
            ...sceneJSON.generators.filter((d) => (d.uuid === uuid))[0],
            userData: {
              ...sceneJSON.generators.filter((d) => (d.uuid === uuid))[0].userData,
              isPatchHidden: true,
            },
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
          ...sceneJSON.connections.filter(
            (c) => (c.from !== uuid && c.to !== uuid),
          ),
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
            looped: true,
            paused: false,
            userData: {
              isPatchHidden: false,
            },
          },
        ],
      });
    },
    // ThreeObj
    hideThreeObjPatch(uuid, val) {
      const filterdChildren = sceneJSON.object.children;
      hideChild(filterdChildren, uuid, val, () => {
        setSceneJSON({
          ...sceneJSON,
          object: {
            ...sceneJSON.object,
            children: filterdChildren,
          },
        });
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
          connections: [
            ...sceneJSON.connections.filter(
              (c) => (c.from !== uuid && c.to !== uuid),
            ),
          ],
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
              userData: {
                isPatchHidden: false,
              },
            },
          ],
        },
      });
    },
    // Peers
    hidePeer(uuid) {
      setSceneJSON({
        ...sceneJSON,
        peers: [
          ...sceneJSON.peers.filter((d) => (d.uuid !== uuid)),
          {
            ...sceneJSON.peers.filter((d) => (d.uuid === uuid))[0],
            userData: {
              ...sceneJSON.peers.filter((d) => (d.uuid === uuid))[0].userData,
              isPatchHidden: true,
            },
          },
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
          ...sceneJSON.connections.filter(
            (c) => (c.from !== uuid && c.to !== uuid),
          ),
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
            userData: {
              isPatchHidden: false,
            },
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
          ...sceneJSON.connections.filter(
            (c) => (c.uuid !== oldEdge.id),
          ),
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
    removeConnection(oldEdge) {
      setSceneJSON({
        ...sceneJSON,
        connections: [
          ...sceneJSON.connections.filter(
            (c) => (c.uuid !== oldEdge.id),
          ),
        ],
      });
    },
    removeFromParent(uuid) {
      const filterdChildren = sceneJSON.object.children;
      removeChild(filterdChildren, uuid, (c) => {
        setSceneJSON({
          ...sceneJSON,
          object: {
            ...sceneJSON.object,
            children: [
              ...filterdChildren,
              c[0],
            ],
          },
        });
      });
    },
  }), [sceneJSON, setSceneJSON, removeChild, hideChild]);

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
  sceneJSON: PropTypes.shape({
    object: PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    transforms: PropTypes.arrayOf(PropTypes.shape({})),
    connections: PropTypes.arrayOf(PropTypes.shape({})),
    mediaPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    widgets: PropTypes.arrayOf(PropTypes.shape({})),
    devices: PropTypes.arrayOf(PropTypes.shape({})),
    generators: PropTypes.arrayOf(PropTypes.shape({})),
    geometries: PropTypes.arrayOf(PropTypes.shape({})),
    materials: PropTypes.arrayOf(PropTypes.shape({})),
    peers: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  children: PropTypes.node.isRequired,
};

AppManager.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default AppManager;
