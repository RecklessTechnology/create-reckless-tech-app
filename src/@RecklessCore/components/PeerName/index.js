import PeerNameView from './view';
import PeerNameEdit from './edit';

const PeerName = ({ peerInfo, onNameUpdate }) => {
  switch(peerInfo.mode) {
    default:
    case 'waiting':
      return <PeerNameView {...{ primary: '...loading', secondary: ''}}/>;
    case 'view':
      return <PeerNameView {...{ primary: `${peerInfo.name} (${peerInfo.uuid})`, secondary: `${(peerInfo.isMe) ? `me` : `peer`} (${peerInfo.peerId})`}}/>;
    case 'edit':
      return <PeerNameEdit {...{ value: peerInfo.name, onNameUpdate: onNameUpdate }}/>;
  }
}

PeerName.whyDidYouRender = true;

export default PeerName;