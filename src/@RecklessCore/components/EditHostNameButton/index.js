import EditPeerNameButtonView from './view';

const EditPeerNameButton = ({ peerInfo }) => <EditPeerNameButtonView {...{ peerInfo }} />;

EditPeerNameButton.whyDidYouRender = true;

export default EditPeerNameButton;
