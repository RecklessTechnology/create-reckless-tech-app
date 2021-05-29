import { makeStyles } from '@material-ui/core/styles';

import { Divider, ListItem, IconButton, Tooltip, Grid, Typography } from "@material-ui/core";

import AdjustIcon from '@material-ui/icons/Adjust';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import useConnectionsContext from '../../@RecklessCore/useConnectionsContext';
import useAppContext from '../../@RecklessCore/useAppContext';

export default function PeerListItem({peerInfo}) {
  const { sceneJSON } = useAppContext();
  const { me } = useConnectionsContext();

  // Create local classes
  const classes = makeStyles((theme) => ({
    iconButton: {
      margin: '0px 15px',
    }
  }))();

  return (
    <ListItem>
      <Grid container>
          <Grid item xs={12}><Typography variant="subtitle2">{peerInfo.id}</Typography></Grid>
          <Grid item xs={4}>
            <Tooltip title={"Ping"} aria-label="Ping">
              <IconButton className={classes.iconButton} onClick={()=>{
                // send ping to this user
                peerInfo.sendData({ type: 'ping', payload: {}, from: me.id, timestamp: Date.now }, peerInfo.id);
              }}>
                <AdjustIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title={peerInfo.isMe ? "Share Scene With Everyone" : "Share Scene"} aria-label="Share Scene">
              <IconButton className={classes.iconButton} onClick={()=>{
                peerInfo.sendData({ type: 'shareScene', payload: sceneJSON, from: me.id, timestamp: Date.now }, peerInfo.id);
              }}>
                <OpenInBrowserIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      <Divider />
    </ListItem>
  );
}