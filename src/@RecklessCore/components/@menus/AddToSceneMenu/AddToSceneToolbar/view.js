/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCube, faWaveSquare, faMouse, faSquareRootAlt, faUsers,
} from '@fortawesome/free-solid-svg-icons';

import {
  AppBar, Toolbar, Typography, Tabs, Tooltip, Tab,
} from '@material-ui/core';

import AddToSceneCloseButton from '../../../@buttons/AddToScene/AddToSceneCloseButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  tabRoot: {
    minWidth: '50px',
  },
}));

const AddToSceneToolbarView = (props, ref) => {
  const { closeMenu, value, handleChange } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
        >
          <AddToSceneCloseButton handleClose={closeMenu} />
          <div className={classes.spacer} />
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            indicatorColor="secondary"
            textColor="secondary"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
          >
            <Tooltip title="3D Objects" aria-label="3D Objects">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={(<FontAwesomeIcon icon={faCube} />)}
                aria-label="objects"
                {...{
                  id: 'objects-tab-0',
                  'aria-controls': 'objects-tabpanel-0',
                }}
              />
            </Tooltip>
            <Tooltip title="Generators" aria-label="Generators">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={<FontAwesomeIcon icon={faWaveSquare} />}
                aria-label="generators"
                {...{
                  id: 'generators-tab-1',
                  'aria-controls': 'generators-tabpanel-1',
                }}
              />
            </Tooltip>
            <Tooltip title="Peers" aria-label="Peers">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={<FontAwesomeIcon icon={faUsers} />}
                aria-label="peers"
                {...{
                  id: 'peers-tab-2',
                  'aria-controls': 'peers-tabpanel-2',
                }}
              />
            </Tooltip>
            <Tooltip title="Devices" aria-label="Devices">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={<FontAwesomeIcon icon={faMouse} />}
                aria-label="devices"
                {...{
                  id: 'devices-tab-3',
                  'aria-controls': 'devices-tabpanel-3',
                }}
              />
            </Tooltip>
            <Tooltip title="Transforms" aria-label="Transforms">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={<FontAwesomeIcon icon={faSquareRootAlt} />}
                aria-label="transforms"
                {...{
                  id: 'transforms-tab-4',
                  'aria-controls': 'transforms-tabpanel-4',
                }}
              />
            </Tooltip>
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default memo(forwardRef(AddToSceneToolbarView));
