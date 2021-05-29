import React, { useState, useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Divider, List, ListSubheader, ListItem } from "@material-ui/core";

import useConnectionsContext from '../../@RecklessCore/useConnectionsContext';
import useAppContext from '../../@RecklessCore/useAppContext';

import MeListItem from './MeListItem';
import PeerListItem from './PeerListItem';

function PeersList(props) {
  const { getPeersArray } = useConnectionsContext();
  const { subscribe } = useAppContext();
  const [ forceListUpdate, setForceListUpdate ] = useState(false);
  
  let [ peers, setPeers ] = useState([]);

  useMemo(()=>subscribe('peers-list-changed', ()=>{ //update data only when peer list is modified
    setForceListUpdate(true);
  }), [subscribe]);

  useMemo(()=>{
    if (forceListUpdate) {
      setPeers(getPeersArray());
      setForceListUpdate(false);
    }
  }, [forceListUpdate, setPeers, getPeersArray]);

  // Create local classes
  const classes = makeStyles((theme) => ({
    list: {
      width: '100%',
    }
  }))();

  return (
    
    <ListItem>
      <List className={classes.list}>
        <ListSubheader>Me</ListSubheader>
        <MeListItem/>
        <Divider/>
        <ListSubheader>Peers</ListSubheader>
        {peers.map((peer)=>{
          if (peer.isMe !== true) {
            return <PeerListItem key={peer.id} peerInfo={peer}></PeerListItem>
          }
          return null;
        })}
      </List>
    </ListItem>
  );
}

export default PeersList;
