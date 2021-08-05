/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React from 'react';

import MousePatch from './Mouse';

const DevicePatch = ({ data }) => {
  const { type } = data;

  switch (type) {
    default:
      return (<MousePatch {...{ data }} />);
  }
};

DevicePatch.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default DevicePatch;
