import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { Handle, Position } from 'react-flow-renderer';

import { makeStyles } from '@material-ui/core/styles';

import { Tooltip } from '@material-ui/core';

import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  handle: {
    width: '10px',
    height: '10px',
    position: 'relative',
    margin: 0,
    padding: 0,
  },
  handleLeft: {
    float: 'left',
    left: '-10px',
    borderLeft: 'none',
    background: '#333',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  handleRight: {
    float: 'right',
    right: '-10px',
    borderRight: 'none',
    background: '#333',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

const InputHandle = ({ uuid, propName }) => {
  const classes = useStyles();

  return (
    <Tooltip title={`${uuid}-set-${propName}`}>
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id={`${uuid}-set-${propName}`}
          // eslint-disable-next-line no-console
          isValidConnection={(connection) => { console.log('Input isValid: ', connection); return true; }}
          // eslint-disable-next-line no-console
          onConnect={(params) => { console.log('Input onConnect: ', params); }}
          className={clsx(classes.handle, classes.handleLeft)}
        />
      </div>
    </Tooltip>
  );
};

InputHandle.propTypes = {
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};

export default memo(InputHandle);
