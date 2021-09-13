/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import PeerNameView from './view';
import PeerNameEdit from './edit';

const PeerName = ({ peerInfo, onNameUpdate }) => {
  switch (peerInfo.mode) {
    default:
    case 'waiting':
      return <PeerNameView {...{ primary: '...loading', secondary: '' }} />;
    case 'view':
      return <PeerNameView {...{ primary: `${peerInfo.name} (${peerInfo.uuid})`, secondary: `${(peerInfo.isMe) ? 'me' : 'peer'} (${peerInfo.connectionId})` }} />;
    case 'edit':
      return <PeerNameEdit {...{ value: peerInfo.name, onNameUpdate }} />;
  }
};

PeerName.whyDidYouRender = true;

export default PeerName;
