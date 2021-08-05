/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import PeerView from './view';

const Peers = ({ peers }) => peers.map((peer) => (<PeerView key={`rt_${peer.type}_peer_${peer.uuid}`} {...peer} />));

Peers.whyDidYouRender = false;

export default memo(Peers);
