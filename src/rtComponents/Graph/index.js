import React, { useState, useRef } from 'react';

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
} from 'react-flow-renderer';

import Sidebar from './Sidebar';
import './dnd.css';

import MouseInputNode from './components/MoseInputNode';
import OrbitControls from './components/OrbitControls';
import PointLight from './components/PointLight';
import AmbientLight from './components/AmbientLight';
import Box from './components/Box';

let id = 0;
const getId = () => `dndnode_${id++}`;

const NodeEditor = (props, state) => {
  const { sceneGraph, saveSceneGraph } = props;

  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  // const [elements, setElements] = useState(sceneGraph);
  
  const nodeTypes = {
    mouseInput: MouseInputNode,
    orbitControls: OrbitControls,
    pointLight: PointLight,
    ambientLight: AmbientLight,
    box: Box,
  };

  const onConnect = (params) => {
    console.log('onConnect', params);
    // setElements((els) => addEdge(params, els));
    // saveSceneGraph(addEdge(params, sceneGraph));
  };
  
  const onElementsRemove = (elementsToRemove) => {
    console.log('onElementsRemove', elementsToRemove);
  //   // setElements((els) => {
      
  //     saveSceneGraph(removeElements(elementsToRemove, sceneGraph));
  //   // })
    };
  
  const onLoad = (_reactFlowInstance) => {
    console.log('onLoad', _reactFlowInstance)
  //   _reactFlowInstance.fitView();
  //   setReactFlowInstance(_reactFlowInstance)
  };
  
  const onDragOver = (event) => {
    console.log('onDragOver', event)
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();
    console.log('onDrop', event);
    
  //   const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
  //   const type = event.dataTransfer.getData('application/reactflow');
    
  //   const position = reactFlowInstance.project({
  //     x: event.clientX - reactFlowBounds.left,
  //     y: event.clientY - reactFlowBounds.top,
  //   });

  //   const newNode = {
  //     id: getId(),
  //     type,
  //     position,
  //     data: { label: `${type} node` },
  //   };
  //   // setElements((es) => es.concat(newNode));

  //   saveSceneGraph(sceneGraph.concat(newNode));
  };

  return (
    <div style={{width: 100, height: 100}} className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodeTypes={nodeTypes}
            elements={sceneGraph}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default NodeEditor;