import PropTypes, { node } from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100px',
    width: (props) => (props.width),
    padding: 0,
    backgroundColor: '#555',
    border: '1px solid white',
    borderRadius: '10px',
    boxShadow: '5px 5px 5px rgba(0,0,0,0.8)',
  },
}));

/**
 * Root Panel for Patches.
 */
const PatchRoot = ({
  children = node,
  width = 100,
}) => {
  const classes = useStyles({ width });

  return (
    <List dense className={classes.root}>
      {children}
    </List>
  );
};

PatchRoot.propTypes = {
  /**
   * Width of Patch.
   */
  width: PropTypes.number.isRequired,
  /**
   * Contents of Patch.
   */
  children: PropTypes.node.isRequired,
};

export default memo(PatchRoot);
