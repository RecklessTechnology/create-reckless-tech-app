/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: (props) => (props.width),
    backgroundColor: '#555',
    border: '1px solid white',
    borderRadius: '10px',
    paddingBottom: 32,
    boxShadow: '5px 5px 5px rgba(0,0,0,0.8)',
  },
}));

const PatchRoot = ({ children, width }) => {
  const classes = useStyles({ width });

  return (
    <List className={classes.root}>
      {children}
    </List>
  );
};

export default PatchRoot;