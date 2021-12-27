import PropTypes from 'prop-types';

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: (props) => (props.width),
    padding: 0,
    backgroundColor: '#555',
    border: '1px solid white',
    borderRadius: '10px',
    boxShadow: '5px 5px 5px rgba(0,0,0,0.8)',
  },
}));

const PatchRoot = ({ children, width }) => {
  const classes = useStyles({ width });

  return (
    <List dense className={classes.root}>
      {children}
    </List>
  );
};

PatchRoot.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
};

export default PatchRoot;
