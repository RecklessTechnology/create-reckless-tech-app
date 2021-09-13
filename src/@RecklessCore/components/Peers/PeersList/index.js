/* eslint-disable react/jsx-filename-extension */

import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  List, ListItem, Grid, Typography,
} from '@material-ui/core';

import useConnectionsContext from '../../../contexts/useConnectionsContext';
import useAppContext from '../../../contexts/useAppContext';

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
  const { subscribe } = useAppContext();

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
    };
  }, [setConnections, getConnectionsArray, subscribe, updateConnections]);

  if (connections.length === 0) { return null; }

  return (
    <ListItem dense className={classes.listItem}>
      <Grid spacing={0} container>
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle}>Peers</Typography>
        </Grid>
        <Grid item xs={12}>
          <List dense className={classes.list}>
            {connections.map((peer) => <PeerInfo key={peer.connectionId} peerInfo={peer} />)}
          </List>
        </Grid>
      </Grid>
    </ListItem>
  );
};

PeersList.whyDidYouRender = true;

export default PeersList;
