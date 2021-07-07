import { memo } from 'react';

// import { makeStyles } from '@material-ui/styles';

import { ListItemAvatar, Avatar } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
// }));

const PeerAvatar = ({peerInfo}) => {
  // const classes = useStyles();
  return (
    <ListItemAvatar>
      <Avatar alt={peerInfo.isHost ? 'host' : 'Peer'} src="" />
    </ListItemAvatar>
  );
}

PeerAvatar.whyDidYouRender = true;

export default memo(PeerAvatar);