/* eslint-disable react/jsx-filename-extension */

import React, { useState, useMemo } from 'react';

import useAppContext from '../../contexts/useAppContext';
import { rtSceneToFlow } from '../../utils/toFlow';

import Scene from '../@patches/Scene';
import ThreeObject from '../@patches/ThreeObject';

import Device from '../@patches/Device';
import Transform from '../@patches/Transform';
import Generator from '../@patches/Generator';
import Peer from '../@patches/Peer';

import CustomEdge from '../@patches/edges/CustomEdge';
import CustomLineageEdge from '../@patches/edges/CustomLineageEdge';

import NodeEditorView from './view';

const NodeEditor = () => {
  const [elements, setElements] = useState([]);
  const { sceneJSON, updateConnection, addConnection } = useAppContext();

  useMemo(() => { setElements(rtSceneToFlow(sceneJSON)); }, [sceneJSON]);

  const nodeTypes = {
    Scene,
    threeObj: ThreeObject,
    device: Device,
    transform: Transform,
    generator: Generator,
    peer: Peer,
  };

  const edgeTypes = {
    custom: CustomEdge,
    customLineage: CustomLineageEdge,
  };

  return (
    <NodeEditorView {...{
      elements, nodeTypes, edgeTypes, updateConnection, addConnection,
    }}
    />
  );
};

NodeEditor.whyDidYouRender = true;

export default NodeEditor;
