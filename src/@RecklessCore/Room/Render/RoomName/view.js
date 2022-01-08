import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Typography, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  roomName: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}));

const RoomNameView = ({
  roomId,
}) => {
  // Create local classes
  const classes = useStyles();

  return (
    <Tooltip title="Room ID">
      <Typography className={classes.roomName} variant="subtitle1">{roomId}</Typography>
    </Tooltip>
  );
};

RoomNameView.whyDidYouRender = (process.env.NODE_ENV === 'development');

RoomNameView.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default memo(RoomNameView);
