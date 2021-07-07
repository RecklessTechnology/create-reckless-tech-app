import { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton, Tooltip } from "@material-ui/core";

import AdjustIcon from '@material-ui/icons/Adjust';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: '5px',
    marginLeft: '5px',
  }
}));

const PingPeerButtonView = ({ me, peerInfo }) => {
  
  // Create local classes
  const classes = useStyles();
  
  return (
    <Tooltip title={"Ping"} aria-label="Ping">
      <IconButton className={classes.iconButton} onClick={()=>{
        // send ping to this user
        peerInfo.sendData({ type: 'ping', payload: {}, from: me.peerId, timestamp: Date.now }, peerInfo.peerId);
      }}>
        <AdjustIcon />
      </IconButton>
    </Tooltip>
  );
}

PingPeerButtonView.whyDidYouRender = true;

export default memo(PingPeerButtonView);