/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import InspectorCloseButton from '../InspectorCloseButton';

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));

const InspectorToolbarView = () => {
  const classes = useStyles();

  return (
    <div className={classes.drawerHeader}>
      <InspectorCloseButton />
      <Typography variant="h6" className={classes.title}>
        Inspect
      </Typography>
    </div>
  );
};

InspectorToolbarView.whyDidYouRender = true;

export default InspectorToolbarView;
