/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

import React, {
  memo,
  createContext,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Popover,
} from '@material-ui/core';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import IconButtonView from '../IconButton/view';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
  settingsButton: {
    marginRight: '-12px',
    pointerEvents: 'all',
  },
}));

export const RTPopoverContext = createContext(null);
RTPopoverContext.displayName = 'Popover Context';

// eslint-disable-next-line import/no-mutable-exports
let rtPopoverContextValue = {};

const RTPopover = ({
  id, icon, label, children,
  anchorOrigin, transformOrigin,
}) => {
  const classes = useStyles();
  return (
    <PopupState style={{ float: 'right' }} variant="popover" popupId={id}>
      {(popupState) => {
        rtPopoverContextValue = {
          close: popupState.close,
        };
        return (
          <>
            <div className={classes.grow} />
            {/* <IconButtonView
              {...{
                label,
                onClick: () => {},
              }}
              disabled={false}
              className={classes.settingsButton}
              {...bindTrigger(popupState)}
            >
              {icon}
            </IconButtonView> */}
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={anchorOrigin}
              transformOrigin={transformOrigin}
            >
              <RTPopoverContext.Provider value={rtPopoverContextValue}>
                {children}
              </RTPopoverContext.Provider>
            </Popover>
          </>
        );
      }}
    </PopupState>
  );
};

RTPopover.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  anchorOrigin: PropTypes.shape({}).isRequired,
  transformOrigin: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};

export default memo(RTPopover);
