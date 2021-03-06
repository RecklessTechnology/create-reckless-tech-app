import React, {
  useRef, useState, useEffect, useCallback,
  memo,
} from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  List, ListItem, Grid, Typography,
} from '@material-ui/core';

import useConnectionsContext from '../../../Connections/Contexts/useConnectionsContext';
import useAppContext from '../../../App/Contexts/useAppContext';

import PeerInfo from '../PeerInfo';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: 0,
  },
  list: {
    width: '100%',
  },
  sectionTitle: {
    marginTop: 10,
  },
}));

const PeersList = () => {
  const { getConnectionsArray } = useConnectionsContext();
  const { subscribe, unsubscribe } = useAppContext();

  const classes = useStyles();

  const [connections, setConnections] = useState([]);

  const isMounted = useRef(false);

  const updateConnections = useCallback(() => { // update data again when peer list is modified
    if (isMounted.current) {
      const peer = getConnectionsArray();
      if (peer !== undefined && isMounted.current) {
        setConnections(peer.filter((p) => (!p.isMe && !p.isHost)));
      }
    }
  }, [getConnectionsArray, setConnections]);

  useEffect(() => { // update data on load
    const peer = getConnectionsArray();
    if (peer !== undefined) {
      isMounted.current = true;
      setConnections(peer.filter((p) => (!p.isMe && !p.isHost)));
      subscribe('connection-modified', updateConnections);
    }
    return () => {
      isMounted.current = false;
      unsubscribe('connection-modified', updateConnections);
    };
  }, [setConnections, getConnectionsArray, subscribe, unsubscribe, updateConnections]);

  if (connections.length === 0) { return null; }

  // eslint-disable-next-line no-console
  console.log(connections);
  return (
    <ListItem dense className={classes.listItem}>
      <Grid spacing={0} container>
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle}>Peers</Typography>
        </Grid>
        <Grid item xs={12}>
          <List dense className={classes.list}>
            {connections.map((peer) => <PeerInfo key={`peers_list_${peer.connectionId}`} peerInfo={peer} />)}
          </List>
        </Grid>
      </Grid>
    </ListItem>
  );
};

PeersList.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(PeersList);
