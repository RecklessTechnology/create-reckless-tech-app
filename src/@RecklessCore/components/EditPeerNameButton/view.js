/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton, Tooltip } from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
  iconButton: {
    padding: '5px',
    marginLeft: '5px',
  },
}));

const EditPeerNameButtonView = ({ peerInfo, updateConnectionInfo }) => {
  // Create local classes
  const classes = useStyles();

  switch (peerInfo.mode) {
    default:
    case 'view':
      return (
        <Tooltip title="Edit Name" aria-label="Edit Name">
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              updateConnectionInfo(peerInfo.uuid, 'cancel', { mode: 'edit' });
            }}
          >
            <CreateIcon />
          </IconButton>
        </Tooltip>
      );
    case 'edit':
      return (
        <div>
          <Tooltip title="Cancel Save" aria-label="Cancel Save">
            <IconButton
              className={classes.iconButton}
              onClick={() => {
                updateConnectionInfo(peerInfo.uuid, 'cancel', { mode: 'view' });
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save Name" aria-label="Save Name">
            <IconButton
              className={classes.iconButton}
              onClick={() => {
                updateConnectionInfo(peerInfo.uuid, 'save', { mode: 'view' });
              }}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
  }
};

EditPeerNameButtonView.whyDidYouRender = true;

EditPeerNameButtonView.propTypes = {
  peerInfo: PropTypes.shape({
    mode: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  updateConnectionInfo: PropTypes.func.isRequired,
};

export default memo(EditPeerNameButtonView);
