import { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton, Tooltip } from "@material-ui/core";

import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: '5px',
    marginLeft: '5px',
  }
}));

const ShareSceneEveryoneButtonView = ({ me, sceneJSON }) => {
  
  // Create local classes
  const classes = useStyles();
  
  return (
    <Tooltip title={"Share Scene With Everyone"} aria-label="Share Scene">
      <IconButton className={classes.iconButton} onClick={()=>{
        // broadcast ping to everyone
        me.sendData({ type: 'shareScene', payload: sceneJSON, from: me.peerId, timestamp: Date.now });
      }}>
        <OpenInBrowserIcon />
      </IconButton>
    </Tooltip>
  );
}

ShareSceneEveryoneButtonView.whyDidYouRender = true;

export default memo(ShareSceneEveryoneButtonView);