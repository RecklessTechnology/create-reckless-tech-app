import PropTypes from 'prop-types';

import React, { memo } from 'react';
import useAppContext from '../App/Contexts/useAppContext';

import WidgetManager, { DefaultProps } from './Managers/WidgetManager';

import CameraPreview from '../Devices/Widgets/CameraPreview';
import MusicControls from '../MediaPlayers/Widgets/MusicControls';

const WidgetsView = ({ uuid, type, ...props }) => {
  const { sceneJSON } = useAppContext();
  switch (type.toLowerCase()) {
    default:
    case 'preview':
      return (
        (sceneJSON.connections.filter((c) => (c.to === uuid))[0])
          ? (
            <WidgetManager {...DefaultProps} uuid={uuid} type={type} {...props}>
              <CameraPreview
                uuid={uuid}
                type={type}
                {...props}
                connection={sceneJSON.connections.filter((c) => (c.to === uuid))[0]}
              />
            </WidgetManager>
          )
          : null
      );
    case 'musiccontrols':
      return (
        (sceneJSON.connections.filter((c) => (c.to === uuid))[0])
          ? (
            <WidgetManager {...DefaultProps} uuid={uuid} type={type} {...props}>
              <MusicControls
                uuid={uuid}
                type={type}
                {...props}
                connection={sceneJSON.connections.filter((c) => (c.to === uuid))[0]}
              />
            </WidgetManager>
          )
          : null
      );
  }
};

WidgetsView.whyDidYouRender = (process.env.NODE_ENV === 'development');

WidgetsView.propTypes = {
  type: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default memo(WidgetsView);
