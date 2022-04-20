import PropTypes from 'prop-types';

import React, { memo } from 'react';
import ReactFlow, {
  Controls, isNode,
} from 'react-flow-renderer';
import dagre from 'dagre';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    pointerEvents: 'all',
  },
}));

const onLoad = () => {
  // reactFlowInstance.fitView();
};

const nodeWidth = 150;
const nodeHeight = 100;

const NodeEditorView = ({
  elements,
  nodeTypes,
  edgeTypes,
  updateConnection,
  addConnection,
  showControls,
  interactive,
}) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (elems) => {
    dagreGraph.setGraph({
      rankdir: 'LR',
      align: 'DL',
      // ranker: 'tight-tree',
      // acyclicer: 'greedy',
      nodesep: 40,
      edgesep: 40,
      ranksep: 40,
      marginx: 40,
      marginy: 40,
    });

    elems.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    return elems.filter((el) => !el.isHidden).map((el) => {
      let newProps = {};
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        newProps = {
          targetPosition: 'right',
          sourcePosition: 'left',
          position: {
            x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
            y: nodeWithPosition.y - nodeHeight / 2,
          },
        };
      }

      return {
        ...el,
        ...newProps,
      };
    });
  };

  const layoutedElements = getLayoutedElements(elements.filter((el) => !el.isHidden));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ReactFlow
        nodesConnectable={interactive}
        nodesDraggable={interactive}
        zoomOnScroll={interactive}
        panOnScroll={interactive}
        zoomOnDoubleClick={interactive}
        // paneMoveable={interactive}
        elements={layoutedElements}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onLoad={onLoad}
        snapToGrid
        onEdgeUpdate={updateConnection}
        onConnect={addConnection}
      >
        { showControls ? <Controls /> : null }
      </ReactFlow>
    </div>
  );
};

NodeEditorView.whyDidYouRender = (process.env.NODE_ENV === 'development');

NodeEditorView.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  nodeTypes: PropTypes.shape([]).isRequired,
  edgeTypes: PropTypes.shape([]).isRequired,
  updateConnection: PropTypes.func.isRequired,
  addConnection: PropTypes.func.isRequired,
  showControls: PropTypes.bool.isRequired,
  interactive: PropTypes.bool.isRequired,
};

export default memo(NodeEditorView);
