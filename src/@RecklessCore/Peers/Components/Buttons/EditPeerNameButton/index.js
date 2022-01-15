import PropTypes from 'prop-types';

import React from 'react';

import EditPeerNameButtonView from './view';

const EditPeerNameButton = ({ peerInfo, updateConnectionInfo }) => (
  <EditPeerNameButtonView {...{ peerInfo, updateConnectionInfo }} />
);

EditPeerNameButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

EditPeerNameButton.propTypes = {
  peerInfo: PropTypes.shape({}).isRequired,
  updateConnectionInfo: PropTypes.func.isRequired,
};

export default EditPeerNameButton;
