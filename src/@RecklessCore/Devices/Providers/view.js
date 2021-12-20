import PropTypes from 'prop-types';

import React, { memo } from 'react';

import MouseDevice from './Mouse/index';
import KeyboardDevice from './Keyboard/index';
import DeviceManager, { DefaultProps } from '../Managers/DeviceManager';
import CameraDevice from './Camera';

// eslint-disable-next-line react/prop-types
const DevicesView = ({ connection, type, ...props }) => {
  switch (type.toLowerCase()) {
    default:
    case 'mouse':
      return (
        <DeviceManager {...DefaultProps} type={type} {...props}>
          <MouseDevice {...props} />
        </DeviceManager>
      );
    case 'keyboard':
      return (
        <DeviceManager {...DefaultProps} type={type} {...props}>
          <KeyboardDevice {...props} />
        </DeviceManager>
      );
    case 'camera':
      return (
        (connection)
          ? (
            <DeviceManager {...DefaultProps} type={type} {...props}>
              <CameraDevice {...props} />
            </DeviceManager>
          )
          : null
      );
  }
};

DevicesView.whyDidYouRender = (process.env.NODE_ENV === 'development');

DevicesView.propTypes = {
  type: PropTypes.string.isRequired,
};

export default memo(DevicesView);
