import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { ListItemAvatar, Avatar } from '@material-ui/core';

const PeerAvatar = ({ peerInfo }) => (
  <ListItemAvatar>
    <Avatar alt={peerInfo.isHost ? 'host' : 'Peer'} src="" />
  </ListItemAvatar>
);

PeerAvatar.whyDidYouRender = (process.env.NODE_ENV === 'development');

PeerAvatar.propTypes = {
  peerInfo: PropTypes.shape({
    isHost: PropTypes.bool.isRequired,
  }).isRequired,
};

export default memo(PeerAvatar);
