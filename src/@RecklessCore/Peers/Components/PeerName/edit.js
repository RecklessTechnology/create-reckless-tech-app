import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { TextField } from '@material-ui/core';

const PeerNameView = ({ value, onNameUpdate }) => (
  <TextField id="standard-basic" label="Edit name" value={value} onChange={onNameUpdate} />
);

PeerNameView.whyDidYouRender = (process.env.NODE_ENV === 'development');

PeerNameView.propTypes = {
  value: PropTypes.string.isRequired,
  onNameUpdate: PropTypes.func.isRequired,
};

export default memo(PeerNameView);
