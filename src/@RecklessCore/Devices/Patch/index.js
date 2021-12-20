import PropTypes from 'prop-types';

import React from 'react';

import MousePatch from './Mouse';
import CameraPatch from './Camera';

const DevicePatch = ({ data }) => {
  const { type } = data;
  switch (type.toLowerCase()) {
    default:
      return (<MousePatch {...{ data }} />);
    case 'camera':
      return (<CameraPatch {...{ data }} />);
  }
};

DevicePatch.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default DevicePatch;
