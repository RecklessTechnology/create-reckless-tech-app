import { memo } from 'react'

import PeerProvider from './Peer/index';
import PeerOutputManager, { DefaultProps } from '../../managers/PeerOutputManager';

const PeersOutputView = ({props, connection}) => {
  return <PeerOutputManager {...DefaultProps} type={props.type} {...props}>
    <PeerProvider {...{ toProp: connection.toProp }}/>
  </PeerOutputManager>;
}

PeersOutputView.whyDidYouRender = true;

export default memo(PeersOutputView);