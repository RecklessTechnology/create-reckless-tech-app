import { createContext, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import EventsManager from '../managers/EventsManager';
import DefaultSceneJSON from '../sceneDefinitions/LogoScene';
import DefaultSceneJSONClient from '../sceneDefinitions/PosenetScene';

export const AppContext = createContext(null);
export let appContextValue = {};

export default function AppManager({
  children
}) {
  const [sceneJSON, setSceneJSON] = useState(()=>{
    if (window.location.hash.substr(1) === '') {
      return DefaultSceneJSON;
    } else {
      return DefaultSceneJSONClient;
    }
  });
  const [paused, setPaused] = useState(false);
  
  const [events] = useState(() => EventsManager());
  
  const getDefaultGeo = (geoUUID, type) => {
    return {
      uuid: geoUUID,
      type: `${type}Geometry`,
      width: 1,
      height: 1,
      depth: 1,
      widthSegments: 1,
      heightSegments: 1,
      depthSegments: 1
    }
  };

  const getDefaultMat = (materialUUID) => {
    return {
      "uuid": materialUUID,
      "type": "MeshStandardMaterial",
      "color": 16777215,
      "roughness": 1,
      "metalness": 0,
      "emissive": 0,
      "envMapIntensity": 1,
      "refractionRatio": 0.98,
      "depthFunc": 3,
      "depthTest": true,
      "depthWrite": true,
      "colorWrite": true,
      "stencilWrite": false,
      "stencilWriteMask": 255,
      "stencilFunc": 519,
      "stencilRef": 0,
      "stencilFuncMask": 255,
      "stencilFail": 7680,
      "stencilZFail": 7680,
      "stencilZPass": 7680
    };
  }

  const removeChild = (children, uuid, callback) => {
    children.forEach((child, idx) => {
      if (child.uuid === uuid) {
        children.splice(idx,1);
        callback();
      }
      else if (child.children !== undefined) {
        removeChild(child.children, uuid, callback);
      }
    });
  }

  // Add, remove, and update objects from the scene json
  const sceneUtils = useMemo(() => ({
    removeThreeObj(parents, uuid) {
      const filterdChildren = sceneJSON.object.children;
      removeChild(filterdChildren, uuid, ()=>{
        // console.log(childs);
        setSceneJSON({
          ...sceneJSON,
          object: {
            ...sceneJSON.object,
            children: filterdChildren,
          }
        });
      })
      // console.log(childs);
      // parents.map((p)=>{
      //   const match = childs.filter((c)=>(c.uuid === p));
      //   if (match.length > 0) {
      //     childs = match.children;
      //   }
      //   return null
      // });
      // parents.map((id)=>{
      //   let obj = childs.filter((c)=>())
      // });
      
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
              type: "Mesh",
              name: type,
              layers: 1,
              matrix: [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
              geometry: geoUUID,
              material: materialUUID,
            }
          ]
        }
      });
    },
    // Peers
    updatePeer(identifier, ref) {
      setSceneJSON({
        ...sceneJSON,
        peers: [
          ...sceneJSON.peers,
          {
            type: 'peer',
            ...ref
          },
        ],
      });
    },
    addPeer(identifier, ref) {
      setSceneJSON({
        ...sceneJSON,
        peers: [
          ...sceneJSON.peers,
          {
            type: 'peer',
            ...ref
          },
        ],
      });
    },
    removePeer(identifier, ref) {
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
            fromProp: edge.sourceHandle.replace(edge.source, '').split('-')[1],
            to: edge.target,
            toProp: edge.targetHandle.replace(edge.target, '').split('-')[2]
          },
        ]
      })
    },
    updateConnection(oldEdge, newConnection) {
      setSceneJSON({
        ...sceneJSON,
        connections: [
          ...(sceneJSON.connections.filter((con)=>(con.uuid !== oldEdge.id)) ? sceneJSON.connections.filter((con)=>(con.uuid !== oldEdge.id)) : []),
          {
            uuid: oldEdge.id,
            from: newConnection.source,
            fromProp: newConnection.sourceHandle.replace(newConnection.source, '').split('-')[1],
            to: newConnection.target,
            toProp: newConnection.targetHandle.replace(newConnection.target, '').split('-')[2]
          },
        ]
      });
    }
  }), [sceneJSON, setSceneJSON]);

  appContextValue = useMemo(() => ({
  settings: {
  },
  paused,
  setPaused,
  sceneJSON, setSceneJSON,
  ...events,
  ...sceneUtils
  }), [
  paused, setPaused,
  sceneJSON, setSceneJSON,
  events,
  sceneUtils
]);

  return (<AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>)
}
