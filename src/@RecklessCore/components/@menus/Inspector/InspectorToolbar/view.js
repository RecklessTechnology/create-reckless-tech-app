/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faHome, faQuestion,
} from '@fortawesome/free-solid-svg-icons';

import {
  AppBar, Toolbar, Typography, Tabs, Tooltip, Tab,
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';

import InspectorCloseButton from '../../../@buttons/Inspector/InspectorCloseButton';

const useStyles = makeStyles((theme) => ({
  root: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    flexGrow: 0,
    minHeight: 'auto !important',
  },
  tabRoot: {
    minWidth: '50px',
  },
}));

const InspectorToolbarView = (props, ref) => {
  const { closeMenu, value, handleChange } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
        >
          <InspectorCloseButton handleClose={closeMenu} />
          <div className={classes.spacer} />
          <Tabs
            value={value}
            onChange={(event, newValue) => handleChange(newValue)}
            variant="scrollable"
            indicatorColor="secondary"
            textColor="secondary"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
          >
            <Tooltip title="Room" aria-label="Room">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={(<FontAwesomeIcon icon={faHome} />)}
                aria-label="room"
                {...{
                  id: 'room-tab-0',
                  'aria-controls': 'room-tabpanel-0',
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
                  id: 'peers-tab-1',
                  'aria-controls': 'peers-tabpanel-1',
                }}
              />
            </Tooltip>
            <Tooltip title="Help" aria-label="Help">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={<FontAwesomeIcon icon={faQuestion} />}
                aria-label="help"
                {...{
                  id: 'help-tab-1',
                  'aria-controls': 'help-tabpanel-1',
                }}
              />
            </Tooltip>
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default memo(forwardRef(InspectorToolbarView));
