import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar,
  Tabs, Tab, Tooltip,
} from '@material-ui/core';

import SceneSettingsMenu from './sceneSettings';

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
  sceneTabSettings: {},
}));

const EditorToolbarView = ({
  sceneNames,
  activeScene,
  onSetActiveScene,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
        >
          <EditorCloseButton />
          <Tabs
            value={activeScene}
            onChange={(evt, val) => { onSetActiveScene(val); }}
            aria-label="Scene Tabs"
          >
            {sceneNames.map((scene) => (
              <Tooltip
                title={scene.name}
                key={scene.uuid}
                value={scene.uuid}
              >
                <Tab
                  classes={{
                    root: classes.tabRoot,
                  }}
                  label={(
                    <span>
                      {scene.name}
                      {(activeScene === scene.uuid) ? <SceneSettingsMenu /> : null}
                    </span>
                )}
                  {...{
                    id: `${scene.uuid}-tab`,
                    'aria-controls': `${scene.uuids}-tabpanel`,
                  }}
                />
              </Tooltip>
            ))}
          </Tabs>
          <SceneDownloadButtton />
          <div className={classes.spacer} />
          <AddToSceneMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

EditorToolbarView.propTypes = {
  /**
   * Array of uuid and name pairs for each scene.
   */
  sceneNames: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  /**
   * UUID of active scene.
   */
  activeScene: PropTypes.string.isRequired,
  /**
   * Callback to send selected scene to manager.
   */
  onSetActiveScene: PropTypes.func.isRequired,
};

export default memo(EditorToolbarView);
