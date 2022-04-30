import PropTypes from 'prop-types';

import React from 'react';

import PeerNameView from './view';
import PeerNameEdit from './edit';

const PeerName = ({ peerInfo, onNameUpdate }) => {
  const {
    mode = '', name, uuid, isMe, connectionId,
  } = peerInfo;
  switch (mode.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`PeerName Mode Not found: ${mode} - ${uuid}`);
      return null;
    case 'waiting':
      return <PeerNameView {...{ primary: '...loading', secondary: '' }} />;
    case 'view':
      return <PeerNameView {...{ primary: `${name} (${uuid})`, secondary: `${(isMe) ? 'me' : 'peer'} (${connectionId})` }} />;
    case 'edit':
      return <PeerNameEdit {...{ value: name, onNameUpdate }} />;
  }
};

PeerName.whyDidYouRender = (process.env.NODE_ENV === 'development');

PeerName.propTypes = {
  peerInfo: PropTypes.shape({
    mode: PropTypes.string,
    name: PropTypes.string,
    uuid: PropTypes.string,
    isMe: PropTypes.bool,
    connectionId: PropTypes.string,
  }).isRequired,
  onNameUpdate: PropTypes.func.isRequired,
};

export default PeerName;
