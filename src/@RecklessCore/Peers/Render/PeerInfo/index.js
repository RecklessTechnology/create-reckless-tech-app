import PropTypes from 'prop-types';

import React, {
  memo, useState, useCallback, useEffect,
} from 'react';

import { makeStyles } from '@material-ui/styles';

import { ListItem } from '@material-ui/core';

import PeerName from '../PeerName';
import PeerToolbar from '../PeerToolbar';
import ShareScenePeerButton from '../ShareScenePeerButton';
import PeerAvatar from '../PeerAvatar';
import EditPeerNameButton from '../EditPeerNameButton';
import useConnectionsContext from '../../../Connections/Contexts/useConnectionsContext';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: 0,
  },
  buttons: {
    right: 0,
  },
}));

const PeerInfo = ({ peerInfo }) => {
  const classes = useStyles();

  const { updateConnectionInfo } = useConnectionsContext();

  const [peerName, setPeerName] = useState(null);

  const updateName = useCallback((e) => {
    setPeerName(e.currentTarget.value);
  }, [setPeerName]);

  const updateInfo = useCallback((id, type, val) => {
    switch (type.toLowerCase()) {
      default:
      case 'cancel':
        updateConnectionInfo(id, val);
        break;
      case 'save':
        updateConnectionInfo(id, {
          ...val,
          name: peerName,
        });
        break;
    }
  }, [updateConnectionInfo, peerName]);

  useEffect(() => {
    if (peerInfo) {
      setPeerName(peerInfo.name);
    }
  }, [peerInfo, setPeerName]);

  if (!peerInfo || peerName === null) { return <ListItem dense className={classes.listItem} alignItems="flex-start">No</ListItem>; }

  return (
    <ListItem dense className={classes.listItem} alignItems="flex-start">
      <PeerAvatar {...{ peerInfo }} />
      <PeerName {...{ peerInfo: { ...peerInfo, name: peerName }, onNameUpdate: updateName }} />
      <PeerToolbar>
        {(!peerInfo.isMe)
          ? null : <EditPeerNameButton {...{ peerInfo, updateConnectionInfo: updateInfo }} />}
        {(peerInfo.isHost) ? null : <ShareScenePeerButton {...{ peerInfo }} /> }
      </PeerToolbar>
    </ListItem>
  );
};

PeerInfo.whyDidYouRender = (process.env.NODE_ENV === 'development');

PeerInfo.propTypes = {
  peerInfo: PropTypes.shape({
    name: PropTypes.string,
    isMe: PropTypes.bool,
    isHost: PropTypes.bool,
  }).isRequired,
};

export default memo(PeerInfo);
