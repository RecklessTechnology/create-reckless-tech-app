import PropTypes from 'prop-types';

import React from 'react';

import PreviewPatch from './Preview';
import MusicControlsPatch from './MusicControls';
import AudioVisualizerPatch from './AudioVisualizer';

const WidgetPatch = ({ data }) => {
  const { type } = data;
  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Widget Patch: ${type}`);
      return null;
    case 'musiccontrols':
      return (<MusicControlsPatch {...{ data }} />);
    case 'audiovisualizer':
      return (<AudioVisualizerPatch {...{ data }} />);
    case 'camerapreview':
      return (<PreviewPatch {...{ data }} />);
  }
};

WidgetPatch.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default WidgetPatch;
