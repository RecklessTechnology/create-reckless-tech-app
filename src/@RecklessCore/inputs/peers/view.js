import { memo } from 'react'

import PeerManager, { DefaultProps } from '../../managers/PeerManager';

const PeersView = ({props}) => {
  return <PeerManager {...DefaultProps} type={props.type} {...props}>
  </PeerManager>;
}

PeersView.whyDidYouRender = true;

export default memo(PeersView);