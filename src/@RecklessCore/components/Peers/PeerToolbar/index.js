/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { ListItemSecondaryAction } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbarButtons: {
    padding: '15px 0 15px 15px',
    right: 0,
    background: `linear-gradient(to left, ${theme.palette.background.paper} 90%, rgba(0,0,0,0))`,
  },
}));

const PeerToolbar = ({ children }) => {
  const classes = useStyles();
  return (
    <ListItemSecondaryAction className={classes.toolbarButtons}>
      {children}
    </ListItemSecondaryAction>
  );
};

export default PeerToolbar;
