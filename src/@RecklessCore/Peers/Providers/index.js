import React, { memo } from 'react';

import PeersView from './view';

const Peers = ({ peers, connections }) => peers.map((peer) => (
  <PeersView
    key={`rt_${peer.type}_peer_${peer.uuid}`}
    connections={connections}
    {...peer}
  />
));

Peers.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(Peers);
