/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton, Tooltip } from '@material-ui/core';

import RefreshIcon from '@material-ui/icons/Refresh';

import generateRoomId from '../../utils/generateRoomId';

const useStyles = makeStyles(() => ({
  iconButton: {
    margin: '0px 27.66px',
  },
}));

const RoomRefreshIdButtonView = ({ setRoomInfo }) => {
  // Create local classes
  const classes = useStyles();

  return (
    <Tooltip title="Refresh Room ID" aria-label="Refresh Room ID">
      <IconButton
        className={classes.iconButton}
        onClick={() => {
          setRoomInfo({
            id: generateRoomId(),
          });
        }}
      >
        <RefreshIcon />
      </IconButton>
    </Tooltip>
  );
};

RoomRefreshIdButtonView.whyDidYouRender = true;

RoomRefreshIdButtonView.propTypes = {
  setRoomInfo: PropTypes.func.isRequired,
};

export default memo(RoomRefreshIdButtonView);
