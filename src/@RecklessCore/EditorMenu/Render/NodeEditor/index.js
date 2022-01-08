import React, { useState, useMemo } from 'react';

import useAppContext from '../../../App/Contexts/useAppContext';
import { rtSceneToFlow } from '../../../Utils/toFlow';

import Scene from '../../../Scenes/Patch';
import ThreeObject from '../../../ThreeObjects/Patch';

import Device from '../../../Devices/Patch';
import Transform from '../../../Transforms/Patch';
import Generator from '../../../Generators/Patch';
import Peer from '../../../Peers/Patch';
import Widget from '../../../Widgets/Patch';

import CustomEdge from '../../../Components/Patches/Edges/CustomEdge';
import CustomLineageEdge from '../../../Components/Patches/Edges/CustomLineageEdge';

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
    widget: Widget,
  };

  const edgeTypes = {
    custom: CustomEdge,
    customLineage: CustomLineageEdge,
  };

  return (
    <NodeEditorView {...{
      elements,
      nodeTypes,
      edgeTypes,
      updateConnection,
      addConnection,
      showControls: true,
      interactive: true,
    }}
    />
  );
};

NodeEditor.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default NodeEditor;
