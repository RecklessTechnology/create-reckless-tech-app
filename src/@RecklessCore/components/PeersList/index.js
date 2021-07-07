import React, { useState, useMemo, useEffect, useCallback } from 'react';

import { makeStyles } from '@material-ui/styles';

import { List, ListItem, Grid, Typography } from '@material-ui/core';

import usePeersContext from '../../contexts/usePeersContext';
import useAppContext from '../../contexts/useAppContext';

import PeerInfo from '../PeerInfo';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: 0,
  },
  list: {
    width: '100%',
  },
  sectionTitle: {
    marginTop: 10,
  }
}));

const PeersList = (props) => {
  const { getPeersArray } = usePeersContext();
  const { subscribe } = useAppContext();
  
  const classes = useStyles();

  const [ peers, setPeers ] = useState([]);

  useEffect(()=>{
    setPeers(getPeersArray().filter((p)=>(!p.isMe && !p.isHost)));
  }, [setPeers, getPeersArray]);

  const updatePeers = useCallback((peer)=>{ //update data only when peer list is modified
    const p = getPeersArray();
    if (p !== undefined) {
      setPeers(p.filter((p)=>(!p.isMe && !p.isHost)));
    }
  }, [getPeersArray, setPeers]);
  
  useMemo(()=>subscribe('peer-modified', updatePeers), [subscribe, updatePeers]);

  if (peers.length === 0) { return null; }

  return (
    <ListItem className={classes.listItem}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle}>Peers</Typography>
        </Grid>
        <Grid item xs={12}>
          <List className={classes.list}>
            {peers.map((peer)=>{
              return <PeerInfo key={peer.peerId} peerInfo={peer}></PeerInfo>
            })}
          </List>
        </Grid>
      </Grid>
    </ListItem>
  );
}

PeersList.whyDidYouRender = true;

export default PeersList;