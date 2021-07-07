import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem } from '@material-ui/core';

import PropListItem from '../shared/PropListItem/index';
import PatchValue from './PatchValue/index';
// import PatchDetails from '../shared/PatchDetails/index';
import PeerInfo from '../../PeerInfo';
import usePeersContext from '../../../contexts/usePeersContext';

const useStyles = makeStyles((theme)=>({
  root: {
    width: (props)=>(props.width),
    height: (props)=>(props.height),
    backgroundColor: theme.palette.background.paper,
    border: '1px solid white',
  },
  propItem: {
    margin: 0,
    padding: '0 10px',
  },
  propGrid: {
    width: '100%',
    height: '100%',
  },
  propText: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  handle: {
    width: '10px',
    height: '10px',
    position: 'relative',
    margin: 0,
    padding: 0,
    borderRadius: 0,
    marginTop: 10,
  },
  handleLeft: {
    float: 'left',
    left: '-25px'
  },
  handleRight: {
    float: 'right',
    right: '-25px'
  }
}));

const PeerPatch = ({ data }) => {
  const { findPeer } = usePeersContext();
  const [ peer, setPeer ] = useState(null);
  const { id, width, height, } = data;
  const classes = useStyles({ width, height });
  
  const props = [
    // { uuid: uuid, propName: 'disabled', disableInput: false, disableOutput: false },
    // { uuid: uuid, propName: 'debug', disableInput: false, disableOutput: false },
    { uuid: id, propName: 'data', disableInput: false, disableOutput: false },
  ]

  useEffect(()=>{
    const p = findPeer(id);
    setPeer(p);
  }, [id, findPeer, setPeer])

  return (<List className={classes.root}>
    <ListItem className={classes.propItem}>
      {/* <PatchDetails {...{ name:id, type: type}} /> */}
      <PeerInfo peerInfo={peer}></PeerInfo>
    </ListItem>
    {props.map((p)=>(<PropListItem key={`${p.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: p.uuid, propName: p.propName }} /></PropListItem>))}
  </List>);
}

export default PeerPatch;