import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Crop75Icon from '@material-ui/icons/Crop75';

import {
  List, ListItem, Popover,
} from '@material-ui/core';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import SettingsIcon from '@material-ui/icons/Settings';

import IconButtonView from '../../../../Components/Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  root: {},
}));

const SceneSettings = () => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  return (
    <PopupState style={{ float: 'right' }} variant="popover" popupId="WidgetSettingsPopup">
      {(popupState) => (
        <>
          <div className={classes.grow} />
          <IconButtonView
            {...{
              label: 'Settings',
              onClick: () => {},
            }}
            disabled={false}
            className=""
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
              <ListItem>
                <div>
                  <IconButtonView
                    {...{
                      label: 'Small',
                      onClick: () => {
                        // handleSizeChange(0);
                        popupState.close();
                      },
                    }}
                    className=""
                    disabled={false}
                  >
                    <Crop75Icon fontSize="small" />
                  </IconButtonView>
                </div>
              </ListItem>
            </List>
          </Popover>
        </>
      )}
    </PopupState>
  );
};

SceneSettings.propTypes = {};

export default memo(SceneSettings);
