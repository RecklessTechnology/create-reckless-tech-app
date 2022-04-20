import PropTypes from 'prop-types';

import React, { memo } from 'react';

import PeerManager, { DefaultProps } from '../Managers/PeerManager';

const PeersView = ({ connections, type, ...props }) => (
  <PeerManager
    connections={connections}
    {...DefaultProps}
    type={type}
    {...props}
  >
    <div />
  </PeerManager>
);

PeersView.whyDidYouRender = (process.env.NODE_ENV === 'development');

PeersView.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(PeersView);
