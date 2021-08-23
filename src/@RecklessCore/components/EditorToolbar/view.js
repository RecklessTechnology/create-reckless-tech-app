/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import EditorCloseButton from '../EditorCloseButton/index';
import SceneDownloadButtton from '../SceneDownloadButton';
import AddToEditorMenu from '../AddToEditorMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    minHeight: 'auto !important',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
}));

const EditorToolbarView = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
        >
          <EditorCloseButton />
          <Typography variant="h6" className={classes.title}>
            Editor
          </Typography>
          <SceneDownloadButtton />
          <div className={classes.spacer} />
          <AddToEditorMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default memo(EditorToolbarView);
