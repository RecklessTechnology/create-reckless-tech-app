import { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton, Tooltip } from "@material-ui/core";

import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

// import usePeersContext from '../../contexts/usePeersContext';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: '5px',
    marginLeft: '5px',
  }
}));

const EditPeerNameButtonView = ({ peerInfo, updatePeerInfo }) => {
  // Create local classes
  const classes = useStyles();
  
  switch(peerInfo.mode) {
    default:
    case 'view':
      return (
        <Tooltip title={"Edit Name"} aria-label="Edit Name">
          <IconButton className={classes.iconButton} onClick={()=>{
            updatePeerInfo(peerInfo.peerId, 'cancel', { mode : 'edit' });
          }}>
            <CreateIcon />
          </IconButton>
        </Tooltip>
      );
    case 'edit':
      return (
        <div>
          <Tooltip title={"Cancel Save"} aria-label="Cancel Save">
            <IconButton className={classes.iconButton} onClick={()=>{
              updatePeerInfo(peerInfo.peerId, 'cancel', { mode : 'view' });
            }}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Save Name"} aria-label="Save Name">
            <IconButton className={classes.iconButton} onClick={()=>{
              updatePeerInfo(peerInfo.peerId, 'save', { mode : 'view' });
            }}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
  }
}

EditPeerNameButtonView.whyDidYouRender = true;

export default memo(EditPeerNameButtonView);