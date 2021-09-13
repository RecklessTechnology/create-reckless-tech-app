/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { ListItemAvatar, Avatar } from '@material-ui/core';

const PeerAvatar = ({ peerInfo }) => (
  <ListItemAvatar>
    <Avatar alt={peerInfo.isHost ? 'host' : 'Peer'} src="" />
  </ListItemAvatar>
);

PeerAvatar.whyDidYouRender = true;

PeerAvatar.propTypes = {
  peerInfo: PropTypes.shape({
    isHost: PropTypes.bool.isRequired,
  }).isRequired,
};

export default memo(PeerAvatar);
