import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCube, faWaveSquare, faSquareRootAlt, faUsers, faCamera,
} from '@fortawesome/free-solid-svg-icons';

import {
  AppBar, Toolbar, Tabs, Tooltip, Tab,
} from '@material-ui/core';

import AddToSceneCloseButton from '../../../Buttons/AddToSceneCloseButton';

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

const AddToSceneToolbarView = ({ closeMenu, value, handleChange }) => {
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
            title="Add to Scene"
          >
            <Tooltip title="3D Objects">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={(<FontAwesomeIcon icon={faCube} />)}
                {...{
                  id: 'objects-tab-0',
                  'aria-controls': 'objects-tabpanel-0',
                }}
              />
            </Tooltip>
            <Tooltip title="Generators">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={<FontAwesomeIcon icon={faWaveSquare} />}
                {...{
                  id: 'generators-tab-1',
                  'aria-controls': 'generators-tabpanel-1',
                }}
              />
            </Tooltip>
            <Tooltip title="Peers">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={<FontAwesomeIcon icon={faUsers} />}
                {...{
                  id: 'peers-tab-2',
                  'aria-controls': 'peers-tabpanel-2',
                }}
              />
            </Tooltip>
            <Tooltip title="Devices">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={<FontAwesomeIcon icon={faCamera} />}
                {...{
                  id: 'devices-tab-3',
                  'aria-controls': 'devices-tabpanel-3',
                }}
              />
            </Tooltip>
            <Tooltip title="Transforms">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={<FontAwesomeIcon icon={faSquareRootAlt} />}
                title="transforms"
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

AddToSceneToolbarView.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default memo(AddToSceneToolbarView);
