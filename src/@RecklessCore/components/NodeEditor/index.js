import { useState, useMemo } from 'react';

import useAppContext from '../../contexts/useAppContext';
import { threeToFlow  }from '../../utils/toFlow';

import ThreeObject from '../@patches/ThreeObject';
import Generator from '../@patches/Generator';
import Peer from '../@patches/Peer';
import Scene from '../@patches/Scene';

import NodeEditorView from './view';


const NodeEditor = () => {
  const [elements, setElements] = useState([]);
  const { sceneJSON, updateConnection, addConnection } = useAppContext();

  useMemo(()=>{ setElements(threeToFlow(sceneJSON)) }, [sceneJSON]);

  const nodeTypes = {
    threeObj: ThreeObject,
    generator: Generator,
    peer: Peer,
    Scene: Scene,
  };

  return <NodeEditorView {...{ elements: elements, nodeTypes: nodeTypes, updateConnection: updateConnection, addConnection: addConnection }}/>;
};

Node.whyDidYouRender = true;

export default NodeEditor;