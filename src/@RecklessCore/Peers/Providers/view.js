import PropTypes from 'prop-types';

import React, { memo } from 'react';

import PeerManager, { DefaultProps } from '../Managers/PeerManager';

const PeerView = ({ type, ...props }) => (
  <PeerManager {...DefaultProps} type={type} {...props} />
);

PeerView.whyDidYouRender = (process.env.NODE_ENV === 'development');

PeerView.propTypes = {
  type: PropTypes.string.isRequired,
};

export default memo(PeerView);
