import { makeStyles } from '@material-ui/core/styles';

import { Divider, ListItem, IconButton, Tooltip, Grid, Typography } from "@material-ui/core";

import AdjustIcon from '@material-ui/icons/Adjust';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import useAppContext from '../../@RecklessCore/useAppContext';
import useConnectionsContext from '../../@RecklessCore/useConnectionsContext';

export default function MeListItem() {
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
          <Grid item xs={12}><Typography variant="subtitle2">{me.id}</Typography></Grid>          
            <Grid item xs={4}>
              <Tooltip title={"Ping Everyone"} aria-label="Ping Everyone">
                <IconButton className={classes.iconButton} onClick={()=>{
                  // broadcast ping to everyone
                  setInterval(()=>{
                    me.sendData({ type: 'ping', payload: {}, from: me.id, timestamp: Date.now });
                  }, 1000 / 60 );
                }}>
                  <AdjustIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              <Tooltip title={"Share Scene With Everyone"} aria-label="Share Scene">
                <IconButton className={classes.iconButton} onClick={()=>{
                  // broadcast ping to everyone
                  me.sendData({ type: 'shareScene', payload: sceneJSON, from: me.id, timestamp: Date.now });
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