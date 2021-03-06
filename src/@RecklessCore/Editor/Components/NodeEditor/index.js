import React, { useState, useMemo } from 'react';

import useAppContext from '../../../App/Contexts/useAppContext';
import { rtSceneToFlow } from '../../../Utils/toFlow';

import Scene from '../../../Scenes/Patches';
import ThreeObject from '../../../ThreeObjects/Patches';

import MediaPlayer from '../../../MediaPlayers/Patches';

import Device from '../../../Devices/Patches';
import Transform from '../../../Transforms/Patches';
import Generator from '../../../Generators/Patches';
import Peer from '../../../Peers/Patches';

import Widget from '../../../Widgets/Patches';

import CustomEdge from '../../../Components/Patches/Edges/CustomEdge';
import CustomLineageEdge from '../../../Components/Patches/Edges/CustomLineageEdge';

import NodeEditorView from './view';

const NodeEditor = () => {
  const [elements, setElements] = useState([]);
  const { sceneJSON, updateConnection, addConnection } = useAppContext();

  const { metadata } = sceneJSON;
  const { editorInteractive } = metadata;

  useMemo(() => { setElements(rtSceneToFlow(sceneJSON)); }, [sceneJSON]);

  const nodeTypes = {
    Scene,
    threeobj: ThreeObject,
    device: Device,
    transform: Transform,
    generator: Generator,
    peer: Peer,
    widget: Widget,
    mediaPlayer: MediaPlayer,
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
      showControls: editorInteractive,
      interactive: editorInteractive,
    }}
    />
  );
};

NodeEditor.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default NodeEditor;
