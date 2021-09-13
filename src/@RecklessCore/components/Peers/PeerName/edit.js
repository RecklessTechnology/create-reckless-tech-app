/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { TextField } from '@material-ui/core';

const PeerNameView = ({ value, onNameUpdate }) => (
  <TextField id="standard-basic" label="Edit name" value={value} onChange={onNameUpdate} />
);

PeerNameView.whyDidYouRender = true;

PeerNameView.propTypes = {
  value: PropTypes.string.isRequired,
  onNameUpdate: PropTypes.func.isRequired,
};

export default memo(PeerNameView);
