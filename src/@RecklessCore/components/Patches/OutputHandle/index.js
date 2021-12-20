import PropTypes from 'prop-types';

import React from 'react';

import { Handle } from 'react-flow-renderer';

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

const OutputHandle = ({ uuid, propName }) => {
  const classes = useStyles();

  return (
    <Tooltip title={`${uuid}-${propName}`} aria-label={propName}>
      <div>
        <Handle
          type="source"
          position="right"
          id={`${uuid}-${propName}`}
          // eslint-disable-next-line no-console
          isValidConnection={(connection) => { console.log('Output isValid: ', connection); return true; }}
          // eslint-disable-next-line no-console
          onConnect={(params) => { console.log('Output onConnect: ', params); }}
          className={clsx(classes.handle, classes.handleRight)}
        />
      </div>
    </Tooltip>
  );
};

OutputHandle.propTypes = {
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};

export default OutputHandle;
