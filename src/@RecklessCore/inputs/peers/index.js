import { memo } from 'react'

import PeersView from './view';

const Peers = ({peers}) => {
  return peers.map((peer)=>{
    // if (peer.uuid === undefined) {
      return null;
    // }
    return (<PeersView key={`rt_${peer.type}_peer_${peer.uuid}`} {...{props: peer}}/>);
  })
  
}

Peers.whyDidYouRender = false;

export default memo(Peers);