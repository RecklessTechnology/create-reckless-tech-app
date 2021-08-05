/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import { getSmoothStepPath } from 'react-flow-renderer';

const CustomEdge = ({
  sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, id, style,
}) => {
  const edgePath = getSmoothStepPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  });

  return (
    <g>
      <defs>
        <marker
          id="markerEnd"
          markerWidth="35"
          markerHeight="35"
          viewBox="-10 -10 20 20"
          orient="auto"
          refX="-3"
          refY="0"
        >
          <polyline
            stroke="#222"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            fill="#fff"
            points="-5,-3 0,0 -5,3 -5,-3"
          />
        </marker>
      </defs>
      <circle cx={sourceX} cy={sourceY} fill="#fff" r={4} stroke="#222" strokeWidth={1.5} />
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd="url(#markerEnd)" />
    </g>
  );
};

export default CustomEdge;
