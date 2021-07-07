import EditPeerNameButtonView from './view';

const EditPeerNameButton = ({peerInfo, updatePeerInfo}) => {
  return <EditPeerNameButtonView {...{peerInfo: peerInfo, updatePeerInfo: updatePeerInfo}}/>;
}

EditPeerNameButton.whyDidYouRender = true;

export default EditPeerNameButton;