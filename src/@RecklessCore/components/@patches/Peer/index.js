/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */

import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ListItem } from '@material-ui/core';

import PropListItem from '../shared/PropListItem/index';
import PatchValue from './PatchValue/index';
import PatchDetails from '../shared/PatchDetails/index';
import useConnectionsContext from '../../../contexts/useConnectionsContext';
import PatchRoot from '../shared/PatchRoot';

import PatchToolbar from './PatchToolbar/index';

const useStyles = makeStyles(() => ({
  toolbar: {
    padding: 0,
    position: 'fixed',
    bottom: 0,
  },
}));

const PeerPatch = ({ data }) => {
  const { findConnection } = useConnectionsContext();
  const [peer, setPeer] = useState(null);
  const { uuid, width } = data;

  const [props, setProps] = useState([]);

  useEffect(() => {
    if (peer !== null) {
      setProps([
        {
          uuid: peer.uuid, propName: 'data', disableInput: false, disableOutput: false,
        },
      ]);
    }
  }, [peer]);

  const classes = useStyles();
  useEffect(() => {
    const p = findConnection(uuid);
    if (p !== undefined) {
      setPeer(p);
    }
  }, [uuid, findConnection, setPeer]);

  if (peer === null) { return null; }

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${peer.name}`, uuid: `${peer.uuid}`, type: 'Peer' }} />
      {props.map((p) => (<PropListItem key={`${peer.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: peer.uuid, propName: p.propName }} /></PropListItem>))}
      <ListItem className={classes.toolbar}>
        <PatchToolbar parents={[]} uuid={peer.uuid} />
      </ListItem>
    </PatchRoot>
  );
};

export default PeerPatch;
