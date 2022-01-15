import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import EditorCloseButton from '../../Buttons/EditorCloseButton';
import SceneDownloadButtton from '../../Buttons/SceneDownloadButton';
import AddToSceneMenu from '../../Menus/AddToSceneMenu';

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

  const { object } = sceneJSON;
  const { name } = object;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
        >
          <EditorCloseButton />
          <Typography variant="h6" className={classes.title}>
            {name}
          </Typography>
          <SceneDownloadButtton />
          <div className={classes.spacer} />
          <AddToSceneMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

EditorToolbarView.propTypes = {
  sceneJSON: PropTypes.shape({
    object: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default memo(EditorToolbarView);
