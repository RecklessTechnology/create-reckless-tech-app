import { useEffect, useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ListSubheader, ListItem, List, ListItemIcon, Link, Typography, IconButton, Grid, Tooltip } from "@material-ui/core";

import RefreshIcon from '@material-ui/icons/Refresh';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import QRCode from 'react-qr-code';

import useConnectionsContext from '../../@RecklessCore/useConnectionsContext';

import generateRoomId from '../../@RecklessCore/utils/generateRoomId';

export default function RoomInfo(props) {
  const { roomId, setRoomId } = useConnectionsContext();
  const qrRef = useRef(null);
  const [ qrSize, setQrSize ] = useState(0);

  // Create local classes
  const classes = makeStyles((theme) => ({
    qrContainer: {
      width: '100%',
      height: '100%',
    },
    qrCode: {
      width: '100%',
      height: '100%',
      display: 'block',
      position: 'relative',
      
    },
    roomName: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    iconButton: {
      margin: '0px 15px',
    }
  }))();

  useEffect(() => {
    setQrSize(qrRef.current ? qrRef.current.offsetWidth : 0);
  }, [qrRef]);

  return (
    <List>
      <ListSubheader>Room</ListSubheader>
      <ListItem>
        <ListItemIcon className={classes.qrContainer} ref={qrRef}>
          <QRCode size={qrSize} className={classes.qrCode} value={`${window.location.href}#${roomId}`} />
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <Tooltip title="Room ID" aria-label="Room ID">
          <Typography className={classes.roomName} variant="subtitle1">{roomId}</Typography>
        </Tooltip>
      </ListItem>
      <ListItem>
        <Grid container>
          <Grid item xs={4}>
            <Tooltip title="Refresh Room ID" aria-label="Refresh Room ID">
              <IconButton className={classes.iconButton} onClick={()=>{
                const room = generateRoomId();
                setRoomId(room)
                localStorage.setItem("roomId", room);
              }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title={'Copy URL'}>
                <IconButton className={classes.iconButton} onClick={()=>{
                    navigator.clipboard.writeText(`${window.location.href}#${roomId}`).then()
                  }}> 
                  <FileCopyIcon />
                </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
          <Link href={`${window.location.href}#${roomId}`} target="_blank" rel="noopener">
            <Tooltip title="Open URL" aria-label="Open URL">
                <IconButton className={classes.iconButton}>
                  <OpenInNewIcon />
                </IconButton>
            </Tooltip>
            </Link>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
}