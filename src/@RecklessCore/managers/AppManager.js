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
  
  const sceneUtils = useMemo(() => ({
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
