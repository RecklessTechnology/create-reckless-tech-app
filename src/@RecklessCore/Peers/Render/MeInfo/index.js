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
import useAppContext from '../../../App/Contexts/useAppContext';
import useConnectionsContext from '../../../Connections/Contexts/useConnectionsContext';

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

const MeInfo = () => {
  const classes = useStyles();

  const { updateConnectionInfo, getMe } = useConnectionsContext();
  const { subscribe, unsubscribe } = useAppContext();

  const [meName, setMeName] = useState(null);
  const [me, setMe] = useState(null);

  const isMounted = useRef(false);

  useEffect(() => { // update data on load
    const m = getMe();
    if (m !== undefined) {
      setMe(m);
      setMeName(m.name);
    }
  }, [getMe, setMe]);

  const updateMe = useCallback(() => { // update data again when peer list is modified
    if (isMounted.current) {
      const h = getMe();
      if (h !== undefined) {
        setMe(h);
        setMeName(h.name);
      }
    }
  }, [getMe, setMe]);

  useEffect(() => {
    if (getMe !== undefined) {
      isMounted.current = true;
      subscribe('me-modified', updateMe);
    }
    return () => {
      isMounted.current = false;
      unsubscribe('me-modified', updateMe);
    };
  }, [getMe, subscribe, unsubscribe, updateMe]);

  const updateName = useCallback((e) => {
    setMeName(e.currentTarget.value);
  }, [setMeName]);

  const updateMeInfo = useCallback((id, type, val) => {
    switch (type.toLowerCase()) {
      default:
      case 'cancel':
        updateConnectionInfo(id, val);
        break;
      case 'save':
        updateConnectionInfo(id, {
          ...val,
          name: meName,
        });
        break;
    }
  }, [updateConnectionInfo, meName]);

  if (me === null || meName === null || me.isHost) { return null; }

  return (
    <ListItem dense className={classes.listItem}>
      <Grid spacing={0} container>
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle}>Me</Typography>
        </Grid>
        <Grid item xs={12}>
          <List dense className={classes.list}>
            <ListItem dense className={classes.listItem} alignItems="flex-start">
              <PeerAvatar {...{ peerInfo: me }} />
              <PeerName {...{ peerInfo: { ...me, name: meName }, onNameUpdate: updateName }} />
              {(!me.isMe) ? null : (
                <PeerToolbar>
                  <EditPeerNameButton {...{ peerInfo: me, updateConnectionInfo: updateMeInfo }} />
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

MeInfo.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(MeInfo);
