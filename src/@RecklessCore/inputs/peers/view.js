import { memo } from 'react'

import PeerProvider from './Peer/index';
import PeerInputManager, { DefaultProps } from '../../managers/PeerInputManager';

const PeersView = ({props, connection}) => {
  return <PeerInputManager {...DefaultProps} type={props.type} {...props}>
    <PeerProvider {...{ toProp: connection.toProp }}/>
  </PeerInputManager>;
}

PeersView.whyDidYouRender = true;

export default memo(PeersView);