import { memo, useState, useCallback, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';

import { ListItem } from "@material-ui/core";

import PeerName from '../PeerName';
import PeerToolbar from '../PeerToolbar';
// import PingPeerButton from '../PingPeerButton';
import ShareScenePeerButton from '../ShareScenePeerButton';
import PeerAvatar from '../PeerAvatar';
import EditPeerNameButton from '../EditPeerNameButton';
import usePeersContext from '../../contexts/usePeersContext';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: 0,
  },
  buttons: {
    right: 0,
  }
}));


const PeerInfo = ({peerInfo}) => {
  const classes = useStyles();

  const { updatePeerInfo } = usePeersContext();
  
  const [ peerName, setPeerName ] = useState('');
  
  const updateName = useCallback((e) => {
    setPeerName(e.currentTarget.value)
  }, [setPeerName]);

  const updateInfo = useCallback((id, type, val) => {
    switch (type) {
      default:
      case 'cancel':
        updatePeerInfo(id, val);
        break;
      case 'save':
        updatePeerInfo(id, {
          ...val,
          name: peerName
        });
        break;
    }
  }, [updatePeerInfo, peerName]);

  useEffect(()=>{
    if (peerInfo) {
      setPeerName(peerInfo.name)
    }
  }, [peerInfo, setPeerName])

  if (!peerInfo) { return null; }

  return (
    <ListItem className={classes.listItem} alignItems="flex-start">
      <PeerAvatar {...{ peerInfo: peerInfo }} />
      <PeerName {...{peerInfo: { ...peerInfo, name: peerName }, onNameUpdate: updateName}} />
      <PeerToolbar>
        {(!peerInfo.isMe) ? null : <EditPeerNameButton {...{peerInfo: peerInfo, updatePeerInfo: updateInfo}} />}
        {/* {(peerInfo.isHost) ? null : <PingPeerButton {...{peerInfo: peerInfo}} />} */}
        {(peerInfo.isHost) ? null : <ShareScenePeerButton {...{peerInfo: peerInfo}} /> }
      </PeerToolbar>
    </ListItem>
  );
}

PeerInfo.whyDidYouRender = true;

export default memo(PeerInfo);