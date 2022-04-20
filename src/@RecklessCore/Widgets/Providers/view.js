import PropTypes from 'prop-types';

import React, { memo } from 'react';

import WidgetManager from '../Managers/WidgetManager';
import DefaultProps from '../DefaultProps.json';

import CameraPreview from '../../Devices/Widgets/CameraPreview';
import MusicControls from '../../MediaPlayers/Widgets/MusicControls';
import AudioVisualizer from '../../Transforms/Widgets/AudioVisualizer';

const WidgetsView = ({
  connections,
  uuid,
  type,
  ...props
}) => {
  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown widget type ${type.toLowerCase()}`);
      return null;
    case 'camerapreview':
      return (
        <WidgetManager
          connections={connections}
          {...DefaultProps}
          uuid={uuid}
          type={type}
          {...props}
        >
          <CameraPreview
            uuid={uuid}
            type={type}
            {...props}
            connections={connections}
          />
        </WidgetManager>
      );
    case 'musiccontrols':
      return (
        <WidgetManager
          connections={connections}
          {...DefaultProps}
          uuid={uuid}
          type={type}
          {...props}
        >
          <MusicControls
            uuid={uuid}
            type={type}
            {...props}
            connections={connections}
          />
        </WidgetManager>
      );
    case 'audiovisualizer':
      return (
        <WidgetManager
          connections={connections}
          {...DefaultProps}
          uuid={uuid}
          type={type}
          {...props}
        >
          <AudioVisualizer
            uuid={uuid}
            type={type}
            {...props}
            connections={connections}
          />
        </WidgetManager>
      );
  }
};

WidgetsView.whyDidYouRender = (process.env.NODE_ENV === 'development');

WidgetsView.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default memo(WidgetsView);
