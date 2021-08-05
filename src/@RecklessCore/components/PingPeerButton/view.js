/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton, Tooltip } from '@material-ui/core';

import AdjustIcon from '@material-ui/icons/Adjust';

const useStyles = makeStyles(() => ({
  iconButton: {
    padding: '5px',
    marginLeft: '5px',
  },
}));

const PingPeerButtonView = ({ me, peerInfo }) => {
  // Create local classes
  const classes = useStyles();

  return (
    <Tooltip title="Ping" aria-label="Ping">
      <IconButton
        className={classes.iconButton}
        onClick={() => {
          // send ping to this user
          peerInfo.sendData({
            type: 'ping', payload: {}, from: me.connectionId, timestamp: Date.now,
          }, peerInfo.connectionId);
        }}
      >
        <AdjustIcon />
      </IconButton>
    </Tooltip>
  );
};

PingPeerButtonView.whyDidYouRender = true;

export default memo(PingPeerButtonView);
