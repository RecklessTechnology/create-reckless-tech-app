/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import AddToEditorCloseButton from '../AddToEditorCloseButton/index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const AddToEditorToolbarView = (props, ref) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
        >
          <AddToEditorCloseButton handleClose={(evt) => props.handleClose(evt)} />
          <Typography>Add Component</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default memo(forwardRef(AddToEditorToolbarView));
