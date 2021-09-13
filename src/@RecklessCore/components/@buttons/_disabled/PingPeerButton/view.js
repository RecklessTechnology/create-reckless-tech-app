/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import AdjustIcon from '@material-ui/icons/Adjust';

import IconButtonView from '../@buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  iconButton: {
    padding: '5px',
    marginLeft: '5px',
  },
}));

const PingPeerButtonView = ({ me, peerInfo }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Ping',
        handeClick: () => {
          // send ping to this user
          peerInfo.sendData({
            type: 'ping', payload: {}, from: me.connectionId, timestamp: Date.now,
          }, peerInfo.connectionId);
        },
      }}
      className={classes.iconButton}
    >
      <AdjustIcon fontSize="small" />
    </IconButtonView>
  );
};

PingPeerButtonView.whyDidYouRender = true;

export default memo(PingPeerButtonView);
