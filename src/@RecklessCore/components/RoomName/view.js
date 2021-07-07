import { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Typography, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  roomName: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}));

const RoomNameView = ({
  roomId
}) => {
  // Create local classes
  const classes = useStyles();

  return (
    <Tooltip title="Room ID" aria-label="Room ID">
      <Typography className={classes.roomName} variant="subtitle1">{roomId}</Typography>
    </Tooltip>
  );
}

RoomNameView.whyDidYouRender = true;

export default memo(RoomNameView);
