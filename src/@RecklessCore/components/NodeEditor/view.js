import { memo } from 'react';
import ReactFlow, { Controls, isNode } from 'react-flow-renderer';
import dagre from 'dagre';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));

const onLoad = (reactFlowInstance) => {
  // reactFlowInstance.fitView();
};

const nodeWidth = 200;
const nodeHeight = 250;

const NodeEditorView = ({ elements, nodeTypes, updateConnection, addConnection}) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (elements) => {
    const direction = 'RL';
    dagreGraph.setGraph({ rankdir: direction, align: 'UL' });

    elements.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    return elements.filter((el)=>!el.isHidden).map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        el.targetPosition = 'right';
        el.sourcePosition = 'left';

        // unfortunately we need this little hack to pass a slightly different position
        // to notify react flow about the change. Moreover we are shifting the dagre node position
        // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
        el.position = {
          x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      }

      return el;
    });
  };

  const layoutedElements = getLayoutedElements(elements.filter((el)=>!el.isHidden));

  // Local CSS classes
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ReactFlow
        elements={layoutedElements}
        nodeTypes={nodeTypes}
        onLoad={onLoad}
        snapToGrid
        // nodesDraggable={false}
        // onElementClick={()=>{console.log('node click');}}
        onEdgeUpdate={updateConnection}
        onConnect={addConnection}
        onElementsRemove={()=>{}}
        // onDrop={()=>{console.log('drop');}}
        // onDragOver={()=>{console.log(' dragOver');}}
        // onNodeDragStart={()=>{console.log('node drag');}}
        // onNodeDragStop={()=>{console.log('node drop');}}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

NodeEditorView.whyDidYouRender = true;

export default memo(NodeEditorView);