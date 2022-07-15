import PropTypes from 'prop-types';
import clsx from 'clsx';

import React, {
  memo,
  useContext,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Crop75Icon from '@material-ui/icons/Crop75';
import CropLandscapeIcon from '@material-ui/icons/CropLandscape';
import CropDinIcon from '@material-ui/icons/CropDin';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import {
  List, ListItem,
  ListSubheader,
} from '@material-ui/core';

import IconButtonView from '../../../Components/IconButton/view';
import { RTPopoverContext } from '../../../Components/Popover';

const useStyles = makeStyles(() => ({
  settingSelected: {
    background: 'red',
  },
}));

/**
 * Widget settings (size, location, etc).
 */
const WidgetSettings = ({
  size = 0,
  handleSizeChange = () => {},
  location = 0,
  handleLocationChange = () => {},
}) => {
  const classes = useStyles();
  const { close } = useContext(RTPopoverContext);
  return (
    <List>
      <ListSubheader fontSize="small">Size</ListSubheader>
      <ListItem>
        <div>
          <IconButtonView
            {...{
              label: 'Small',
              onClick: () => {
                handleSizeChange(0);
                close();
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
              onClick: () => {
                handleSizeChange(1);
                close();
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
              onClick: () => {
                handleSizeChange(2);
                close();
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
              onClick: () => {
                handleLocationChange(0);
                close();
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
              onClick: () => {
                handleLocationChange(1);
                close();
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
              onClick: () => {
                handleLocationChange(2);
                close();
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
              onClick: () => {
                handleLocationChange(3);
                close();
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
  );
};

WidgetSettings.propTypes = {
  size: PropTypes.number.isRequired,
  handleSizeChange: PropTypes.func.isRequired,
  location: PropTypes.number.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
};

export default memo(WidgetSettings);
