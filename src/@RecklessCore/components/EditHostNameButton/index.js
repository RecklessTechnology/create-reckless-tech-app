import EditPeerNameButtonView from './view';

const EditPeerNameButton = ({peerInfo}) => {
  return <EditPeerNameButtonView {...{peerInfo: peerInfo}}/>;
}

EditPeerNameButton.whyDidYouRender = true;

export default EditPeerNameButton;