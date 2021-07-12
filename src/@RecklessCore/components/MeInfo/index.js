import { memo, useState, useEffect, useMemo, useCallback } from 'react';

import { Divider, ListItem, Grid, List, Typography } from "@material-ui/core";

import { makeStyles } from '@material-ui/styles';

import PeerAvatar from '../PeerAvatar';
import PeerName from '../PeerName';
import PeerToolbar from '../PeerToolbar';

// import PingPeerButton from '../PingPeerButton';
// import ShareScenePeerButton from '../ShareScenePeerButton';

import useAppContext from '../../contexts/useAppContext';
import usePeersContext from '../../contexts/usePeersContext';
import EditPeerNameButton from '../EditPeerNameButton';

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    marginTop: 10,
  },
  listItem: {
    padding: 0,
  }
}));

const MeInfo = () => {
  const classes = useStyles();

  const { updatePeerInfo, getMe } = usePeersContext();
  const { subscribe } = useAppContext();

  const [ meName, setMeName ] = useState('');
  const [ me, setMe ] = useState({});

  useEffect(()=>{
    setMe(getMe());
  }, [setMe, getMe]);

  const updateMe = useCallback((peer)=>{ //update data only when peer list is modified
    const m = getMe();
    if (m !== undefined) {
      setMe(m);
      setMeName(m.name);
    }
  }, [getMe, setMe, setMeName]);
  useMemo(()=>subscribe('me-modified', updateMe), [subscribe, updateMe]);

  const updateName = useCallback((e) => {
    setMeName(e.currentTarget.value)
  }, [setMeName]);

  useEffect(() => {
    if (me && me.name !== meName) {
      setMeName(me.name)
    }
  }, [me, setMeName, meName]);

  const updateMeInfo = useCallback((id, type, val) => {
    switch (type) {
      default:
      case 'cancel':
        updatePeerInfo(id, val);
        break;
      case 'save':
        updatePeerInfo(id, {
          ...val,
          name: meName
        });
        break;
    }
  }, [updatePeerInfo, meName]);


  if (!me || me.isHost) { return null; }

  return (<ListItem className={classes.listItem}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle}>Me</Typography>
        </Grid>
        <Grid item xs={12}>
          <List className={classes.list}>
            <ListItem className={classes.listItem} alignItems="flex-start">
              <PeerAvatar {...{ peerInfo: me}} />
              <PeerName {...{peerInfo: { ...me, name: meName }, onNameUpdate: updateName}} />
              {(!me.isMe) ? null : <PeerToolbar>
                <EditPeerNameButton {...{peerInfo: me, updatePeerInfo: updateMeInfo}} />
                {/* <PingPeerButton />
                <ShareScenePeerButton  {...{peerInfo:host}} /> */}
              </PeerToolbar>}
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </ListItem>)
  
//   <ListItem className={classes.listItem}>
//   <Grid container spacing={0}>
//     <Grid item xs={12}>
//       Me
//     </Grid>
//     <Grid item xs={12}>
//       <MeName />
//     </Grid>          
//     <Grid item xs={12}>
//       <MeToolbar />
//     </Grid>
//     <Grid item xs={12}>
//       <Divider/>
//     </Grid>
//   </Grid>
// </ListItem>
}

MeInfo.whyDidYouRender = true;

export default memo(MeInfo);