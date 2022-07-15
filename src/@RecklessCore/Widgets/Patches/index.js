import PropTypes from 'prop-types';

import React, { useEffect } from 'react';

import PreviewPatch from './Preview';
import MusicControlsPatch from './MusicControls';
import AudioVisualizerPatch from './AudioVisualizer';
import useAppContext from '../../App/Contexts/useAppContext';

const WidgetPatch = ({ selected, data }) => {
  const { selectedComponent, setSelectedComponent } = useAppContext();
  const { uuid, type, label } = data;

  useEffect(() => {
    setSelectedComponent({ uuid, label, type });
  }, [label, selected, setSelectedComponent, type, uuid]);

  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Widget Patch: ${type}`);
      return null;
    case 'musiccontrols':
      return (
        <MusicControlsPatch
          {...{
            selected: !!((selectedComponent === uuid || selected === true)),
            data,
          }}
        />
      );
    case 'audiovisualizer':
      return (
        <AudioVisualizerPatch
          {...{
            selected: !!((selectedComponent === uuid || selected === true)),
            data,
          }}
        />
      );
    case 'camerapreview':
      return (
        <PreviewPatch
          {...{
            selected: !!((selectedComponent === uuid || selected === true)),
            data,
          }}
        />
      );
  }
};

WidgetPatch.propTypes = {
  selected: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default WidgetPatch;
