import PropTypes from 'prop-types';

import React, { memo } from 'react';

import DeviceManager, { DefaultProps } from '../Managers/DeviceManager';

import MouseDevice from './Mouse/index';
import KeyboardDevice from './Keyboard/index';
import CameraDevice from './Camera';
import AccelDevice from './Accel';

// eslint-disable-next-line react/prop-types
const DevicesView = ({ connections, type, ...props }) => {
  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Device Type: ${type}`);
      return null;
    case 'mouse':
      return (
        <DeviceManager connections={connections} {...DefaultProps} type={type} {...props}>
          <MouseDevice {...props} />
        </DeviceManager>
      );
    case 'keyboard':
      return (
        <DeviceManager connections={connections} {...DefaultProps} type={type} {...props}>
          <KeyboardDevice {...props} />
        </DeviceManager>
      );
    case 'accel':
      return (
        <DeviceManager connections={connections} {...DefaultProps} type={type} {...props}>
          <AccelDevice {...props} />
        </DeviceManager>
      );
    case 'camera':
      return (
        <DeviceManager connections={connections} {...DefaultProps} type={type} {...props}>
          <CameraDevice {...props} />
        </DeviceManager>
      );
  }
};

DevicesView.whyDidYouRender = (process.env.NODE_ENV === 'development');

DevicesView.propTypes = {
  type: PropTypes.string.isRequired,
};

export default memo(DevicesView);
