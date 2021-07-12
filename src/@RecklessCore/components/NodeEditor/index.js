import { useState, useMemo } from 'react';

import useAppContext from '../../contexts/useAppContext';
import { rtSceneToFlow  }from '../../utils/toFlow';

import Scene from '../@patches/Scene';
import ThreeObject from '../@patches/ThreeObject';

import Device from '../@patches/Device';
import Transform from '../@patches/Transform';
import Generator from '../@patches/Generator';
import Peer from '../@patches/Peer';




import NodeEditorView from './view';


const NodeEditor = () => {
  const [elements, setElements] = useState([]);
  const { sceneJSON, updateConnection, addConnection } = useAppContext();

  useMemo(()=>{ setElements(rtSceneToFlow(sceneJSON)) }, [sceneJSON]);

  const nodeTypes = {
    Scene: Scene,
    threeObj: ThreeObject,
    device: Device,
    transform: Transform,
    generator: Generator,
    peer: Peer,
  };

  return <NodeEditorView {...{ elements: elements, nodeTypes: nodeTypes, updateConnection: updateConnection, addConnection: addConnection }}/>;
};

Node.whyDidYouRender = true;

export default NodeEditor;