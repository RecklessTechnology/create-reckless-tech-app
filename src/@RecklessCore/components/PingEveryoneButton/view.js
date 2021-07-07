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

const PingEveryoneButtonView = ({ me }) => {
  
  // Create local classes
  const classes = useStyles();
  
  return (
    <Tooltip title={"Ping Everyone"} aria-label="Ping Everyone">
      <IconButton className={classes.iconButton} onClick={()=>{
        // broadcast ping to everyone
        setInterval(()=>{
          me.sendData({ type: 'ping', payload: {}, from: me.peerId, timestamp: Date.now });
        }, 1000 / 60 );
      }}>
        <AdjustIcon />
      </IconButton>
    </Tooltip>
  );
}

PingEveryoneButtonView.whyDidYouRender = true;

export default memo(PingEveryoneButtonView);