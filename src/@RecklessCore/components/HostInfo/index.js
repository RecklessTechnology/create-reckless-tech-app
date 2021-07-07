import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import { ListItem, Grid, List, Divider, Typography } from "@material-ui/core";

import PeerAvatar from '../PeerAvatar';
import PeerName from '../PeerName';
import PeerToolbar from '../PeerToolbar';

// import PingEveryoneButton from '../PingEveryoneButton';
// import ShareSceneEveryoneButton from '../ShareSceneEveryoneButton ';
import EditPeerNameButton from '../EditPeerNameButton';
// import useConnectionsContext from '../../contexts/useConnectionsContext';
import useAppContext from '../../contexts/useAppContext';
import usePeersContext from '../../contexts/usePeersContext';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: 0,
    overflow: 'hidden',
  },
  list: {
    width: '100%',
  },
  sectionTitle: {
    marginTop: 10,
  }
}));

const HostInfo = () => {
  const classes = useStyles();

  const { updatePeerInfo, getHost } = usePeersContext();
  const { subscribe } = useAppContext();

  const [ hostName, setHostName ] = useState('');
  const [ host, setHost ] = useState({});

  useEffect(()=>{
    setHost(getHost());
  }, [setHost, getHost]);

  const updateHost = useCallback((peer)=>{ //update data only when peer list is modified
    const h = getHost();
    if (h !== undefined) {
      setHost(h);
    }
  }, [getHost, setHost]);

  useMemo(()=>subscribe('host-modified', updateHost), [subscribe, updateHost]);

  const updateName = useCallback((e) => {
    setHostName(e.currentTarget.value)
  }, [setHostName]);

  useEffect(() => {
    if (host) {
      setHostName(host.name);
    }
  }, [host, setHostName]);

  const updateHostInfo = useCallback((id, type, val) => {
    switch (type) {
      default:
      case 'cancel':
        updatePeerInfo(id, val);
        break;
      case 'save':
        updatePeerInfo(id, {
          ...val,
          name: hostName
        });
        break;
    }
  }, [updatePeerInfo, hostName]);


  if (!host || !hostName) { return null; }

  return (
    <ListItem className={classes.listItem}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle}>Host</Typography>
        </Grid>
        <Grid item xs={12}>
          <List className={classes.list}>
            <ListItem className={classes.listItem} alignItems="flex-start">
              <PeerAvatar {...{peerInfo: host}} />
              <PeerName {...{peerInfo: { ...host, name: hostName }, onNameUpdate: updateName}} />
              {(!host.isMe) ? null : <PeerToolbar>
                <EditPeerNameButton {...{peerInfo: host, updatePeerInfo: updateHostInfo}} />
                {/* <PingEveryoneButton />
                <ShareSceneEveryoneButton /> */}
              </PeerToolbar>}
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </ListItem>
  );
}

HostInfo.whyDidYouRender = true;

export default memo(HostInfo);