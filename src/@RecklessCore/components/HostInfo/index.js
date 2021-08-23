/* eslint-disable react/jsx-filename-extension */

import React, {
  memo, useCallback, useEffect, useRef, useState,
} from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  ListItem, Grid, List, Divider, Typography,
} from '@material-ui/core';

import PeerAvatar from '../PeerAvatar';
import PeerName from '../PeerName';
import PeerToolbar from '../PeerToolbar';

import EditPeerNameButton from '../EditPeerNameButton';
import useAppContext from '../../contexts/useAppContext';
import useConnectionsContext from '../../contexts/useConnectionsContext';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: 0,
    overflow: 'hidden',
  },
  list: {
    width: '100%',
  },
  sectionTitle: {
    marginTop: 10,
  },
}));

const HostInfo = () => {
  const classes = useStyles();

  const { updateConnectionInfo, getHost } = useConnectionsContext();
  const { subscribe } = useAppContext();

  const [hostName, setHostName] = useState(null);
  const [host, setHost] = useState(null);

  const isMounted = useRef(false);

  useEffect(() => { // update data on load
    const h = getHost();
    if (h !== undefined) {
      setHost(h);
      setHostName(h.name);
    }
  }, [getHost, setHost]);

  const updateHost = useCallback(() => { // update data again when peer list is modified
    if (isMounted.current) {
      const h = getHost();
      if (h !== undefined) {
        setHost(h);
        setHostName(h.name);
      }
    }
  }, [getHost, setHost]);

  useEffect(() => {
    if (getHost !== undefined) {
      isMounted.current = true;
      subscribe('host-modified', updateHost);
    }
    return () => {
      isMounted.current = false;
    };
  }, [subscribe, getHost, updateHost]);

  const updateName = useCallback((e) => {
    setHostName(e.currentTarget.value);
  }, [setHostName]);

  const updateHostInfo = useCallback((id, type, val) => {
    switch (type) {
      default:
      case 'cancel':
        updateConnectionInfo(id, val);
        break;
      case 'save':
        updateConnectionInfo(id, {
          ...val,
          name: hostName,
        });
        break;
    }
  }, [updateConnectionInfo, hostName]);

  if (host === null || hostName === null) { return null; }

  return (
    <ListItem dense className={classes.listItem}>
      <Grid spacing={0} container>
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle}>Host</Typography>
        </Grid>
        <Grid item xs={12}>
          <List dense className={classes.list}>
            <ListItem dense className={classes.listItem} alignItems="flex-start">
              <PeerAvatar {...{ peerInfo: host }} />
              <PeerName {...{ peerInfo: { ...host, name: hostName }, onNameUpdate: updateName }} />
              {(!host.isMe) ? null : (
                <PeerToolbar>
                  <EditPeerNameButton {...{
                    peerInfo: host, updateConnectionInfo: updateHostInfo,
                  }}
                  />
                </PeerToolbar>
              )}
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </ListItem>
  );
};

HostInfo.whyDidYouRender = true;

export default memo(HostInfo);
