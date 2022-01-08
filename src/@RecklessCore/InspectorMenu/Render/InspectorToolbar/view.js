import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faHome, faQuestion,
} from '@fortawesome/free-solid-svg-icons';

import {
  AppBar, Toolbar, Tabs, Tooltip, Tab,
} from '@material-ui/core';

import InspectorCloseButton from '../InspectorCloseButton';

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

const InspectorToolbarView = (props) => {
  const { value, handleChange } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
        >
          <InspectorCloseButton />
          <div className={classes.spacer} />
          <Tabs
            value={value}
            onChange={(event, newValue) => handleChange(newValue)}
            variant="scrollable"
            indicatorColor="secondary"
            textColor="secondary"
            scrollButtons="off"
            title="Inspect"
          >
            <Tooltip title="Room">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={(<FontAwesomeIcon icon={faHome} />)}
                title="room"
                {...{
                  id: 'room-tab-0',
                  'aria-controls': 'room-tabpanel-0',
                }}
              />
            </Tooltip>
            <Tooltip title="Peers">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={<FontAwesomeIcon icon={faUsers} />}
                title="peers"
                {...{
                  id: 'peers-tab-1',
                  'aria-controls': 'peers-tabpanel-1',
                }}
              />
            </Tooltip>
            <Tooltip title="Help">
              <Tab
                classes={{
                  root: classes.tabRoot,
                }}
                icon={<FontAwesomeIcon icon={faQuestion} />}
                title="help"
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

InspectorToolbarView.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default memo(InspectorToolbarView);
