import React, { memo } from 'react';

import PeerView from './view';

const Peers = ({ peers }) => peers.map((peer) => (<PeerView key={`rt_${peer.type}_peer_${peer.uuid}`} {...peer} />));

Peers.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(Peers);
