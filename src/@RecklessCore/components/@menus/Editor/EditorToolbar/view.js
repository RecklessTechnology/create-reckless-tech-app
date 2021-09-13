/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import EditorCloseButton from '../../../@buttons/Editor/EditorCloseButton';
import SceneDownloadButtton from '../../../@buttons/Editor/SceneDownloadButton';
import AddToSceneMenu from '../../AddToSceneMenu';

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

const EditorToolbarView = ({ sceneJSON }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
        >
          <EditorCloseButton />
          <Typography variant="h6" className={classes.title}>
            {sceneJSON.object.name}
          </Typography>
          <SceneDownloadButtton />
          <div className={classes.spacer} />
          <AddToSceneMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default memo(EditorToolbarView);
