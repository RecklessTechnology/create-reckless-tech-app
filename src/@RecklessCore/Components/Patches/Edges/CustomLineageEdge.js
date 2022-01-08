import PropTypes from 'prop-types';

import React, { useState, memo } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { getBezierPath, getEdgeCenter } from 'react-flow-renderer';

import IconButtonView from '../../Buttons/IconButton/view';
import useAppContext from '../../../App/Contexts/useAppContext';

const useStyles = makeStyles(() => ({
  deleteEdgeButton: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
  },
  foreignObject: { opacity: 0 },
  foreignObjectShow: { opacity: 1 },
}));

const CustomLineageEdge = ({
  sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, id, style,
  source,
}) => {
  const classes = useStyles();

  const { removeFromParent } = useAppContext();

  const [showDelete, setShowDelete] = useState(false);

  const edgePath = getBezierPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const foreignObjectSize = 40;
  return (
    <g
      onMouseOver={() => { setShowDelete(true); }}
      onMouseOut={() => { setShowDelete(false); }}
    >
      <defs>
        <marker
          id="markerEndLineage"
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
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd="url(#markerEndLineage)" />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className={clsx(classes.foreignObject, {
          [classes.foreignObjectShow]: showDelete,
        })}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <IconButtonView
          {...{
            label: 'Emancipate',
            handeClick: () => {
              removeFromParent(source);
            },
          }}
          className={classes.deleteEdgeButton}
          disabled={false}
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconButtonView>
      </foreignObject>
    </g>
  );
};

CustomLineageEdge.propTypes = {
  source: PropTypes.string.isRequired,
  sourceX: PropTypes.number.isRequired,
  sourceY: PropTypes.number.isRequired,
  sourcePosition: PropTypes.string.isRequired,
  targetX: PropTypes.number.isRequired,
  targetY: PropTypes.number.isRequired,
  targetPosition: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  style: PropTypes.shape({}),
};

export default memo(CustomLineageEdge);
