// import PropTypes from 'prop-types';

import React, {
  memo,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar,
} from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

import Popover from '../../../../Components/Popover';

import WidgetSettings from '../../WidgetSettings';

const useStyles = makeStyles((theme) => ({
  widgetToolbarRoot: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    minHeight: 'auto !important',
  },
  appBarRoot: {},
  toolbarRoot: {
    minHeight: 30,
    height: 30,
  },
}));

/**
 * Toolbar to control widget settings (size, location, etc).
 */
const WidgetToolbarView = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.widgetToolbarRoot}>
      <AppBar position="static" color="primary" className={classes.appBarRoot}>
        <Toolbar className={classes.toolbarRoot}>
          <Popover
            id="WidgetSettingsPopup"
            icon={<SettingsIcon fontSize="small" />}
            label="Widget Settings"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <WidgetSettings {...props} />
          </Popover>
        </Toolbar>
      </AppBar>
    </div>
  );
};

WidgetToolbarView.propTypes = {};

export default memo(WidgetToolbarView);
