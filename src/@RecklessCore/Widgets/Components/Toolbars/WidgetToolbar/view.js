import PropTypes from 'prop-types';
import clsx from 'clsx';

import React, {
  memo,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Crop75Icon from '@material-ui/icons/Crop75';
import CropLandscapeIcon from '@material-ui/icons/CropLandscape';
import CropDinIcon from '@material-ui/icons/CropDin';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import {
  AppBar, Toolbar,
  List, ListItem,
  Popover, ListSubheader,
} from '@material-ui/core';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import SettingsIcon from '@material-ui/icons/Settings';

import IconButtonView from '../../../../Components/Buttons/IconButton/view';

const useStyles = makeStyles((theme) => ({
  root: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    minHeight: 'auto !important',
  },
  appBarRoot: {},
  toolbarRoot: {
    minHeight: 30,
    height: 30,
  },
  settingSelected: {
    background: 'red',
  },
  grow: {
    flexGrow: 1,
  },
  settingsButton: {
    marginRight: '-12px',
  },
}));

/**
 * Toolbar to control widget settings (size, location, etc).
 */
const WidgetToolbarView = ({
  size = 0,
  handleSizeChange = () => {},
  location = 0,
  handleLocationChange = () => {},
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary" className={classes.appBarRoot}>
        <Toolbar className={classes.toolbarRoot}>
          <PopupState style={{ float: 'right' }} variant="popover" popupId="WidgetSettingsPopup">
            {(popupState) => (
              <>
                <div className={classes.grow} />
                <IconButtonView
                  {...{
                    label: 'Settings',
                    handeClick: () => {},
                  }}
                  disabled={false}
                  className={classes.settingsButton}
                  {...bindTrigger(popupState)}
                >
                  <SettingsIcon fontSize="small" />
                </IconButtonView>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <List>
                    <ListSubheader fontSize="small">Size</ListSubheader>
                    <ListItem>
                      <div>
                        <IconButtonView
                          {...{
                            label: 'Small',
                            handeClick: () => {
                              handleSizeChange(0);
                              popupState.close();
                            },
                          }}
                          className={clsx({ [classes.settingSelected]: size === 0 })}
                          disabled={false}
                        >
                          <Crop75Icon fontSize="small" />
                        </IconButtonView>
                        <IconButtonView
                          {...{
                            label: 'Medium',
                            handeClick: () => {
                              handleSizeChange(1);
                              popupState.close();
                            },
                          }}
                          className={clsx({ [classes.settingSelected]: size === 1 })}
                          disabled={false}
                        >
                          <CropLandscapeIcon fontSize="small" />
                        </IconButtonView>
                        <IconButtonView
                          {...{
                            label: 'Large',
                            handeClick: () => {
                              handleSizeChange(2);
                              popupState.close();
                            },
                          }}
                          className={clsx({ [classes.settingSelected]: size === 2 })}
                          disabled={false}
                        >
                          <CropDinIcon fontSize="small" />
                        </IconButtonView>
                      </div>
                    </ListItem>
                    <ListSubheader fontSize="small">Location</ListSubheader>
                    <ListItem>
                      <div>
                        <IconButtonView
                          {...{
                            label: 'Top Left',
                            handeClick: () => {
                              handleLocationChange(0);
                              popupState.close();
                            },
                          }}
                          className={clsx({ [classes.settingSelected]: location === 0 })}
                          disabled={false}
                        >
                          <ArrowForwardIcon style={{ transform: 'rotate(-135deg)' }} fontSize="small" />
                        </IconButtonView>
                        <IconButtonView
                          {...{
                            label: 'Top Right',
                            handeClick: () => {
                              handleLocationChange(1);
                              popupState.close();
                            },
                          }}
                          className={clsx({ [classes.settingSelected]: location === 1 })}
                          disabled={false}
                        >
                          <ArrowForwardIcon style={{ transform: 'rotate(-45deg)' }} fontSize="small" />
                        </IconButtonView>
                        <IconButtonView
                          {...{
                            label: 'Bottom Right',
                            handeClick: () => {
                              handleLocationChange(2);
                              popupState.close();
                            },
                          }}
                          className={clsx({ [classes.settingSelected]: location === 2 })}
                          disabled={false}
                        >
                          <ArrowForwardIcon style={{ transform: 'rotate(45deg)' }} fontSize="small" />
                        </IconButtonView>
                        <IconButtonView
                          {...{
                            label: 'Bottom Left',
                            handeClick: () => {
                              handleLocationChange(3);
                              popupState.close();
                            },
                          }}
                          className={clsx({ [classes.settingSelected]: location === 3 })}
                          disabled={false}
                        >
                          <ArrowForwardIcon style={{ transform: 'rotate(135deg)' }} fontSize="small" />
                        </IconButtonView>
                      </div>
                    </ListItem>
                  </List>
                </Popover>
              </>
            )}
          </PopupState>
        </Toolbar>
      </AppBar>
    </div>
  );
};

WidgetToolbarView.propTypes = {
  size: PropTypes.number.isRequired,
  handleSizeChange: PropTypes.func.isRequired,
  location: PropTypes.number.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
};

export default memo(WidgetToolbarView);
