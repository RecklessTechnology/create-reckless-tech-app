import PropTypes from 'prop-types';

import React from 'react';

import PreviewPatch from './Preview';

const WidgetPatch = ({ data }) => {
  const { type } = data;
  switch (type.toLowerCase()) {
    default:
      return (<PreviewPatch {...{ data }} />);
  }
};

WidgetPatch.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default WidgetPatch;
