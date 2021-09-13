/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import MouseDevice from './Mouse/index';
import KeyboardDevice from './Keyboard/index';
import DeviceManager, { DefaultProps } from '../../managers/DeviceManager';

const DevicesView = ({ ...props }) => {
  switch (props.type.toLowerCase()) {
    default:
    case 'mouse':
      return (
        <DeviceManager {...DefaultProps} type={props.type} {...props}>
          <MouseDevice />
        </DeviceManager>
      );
    case 'keyboard':
      return (
        <DeviceManager {...DefaultProps} type={props.type} {...props}>
          <KeyboardDevice />
        </DeviceManager>
      );
  }
};

DevicesView.whyDidYouRender = true;

export default memo(DevicesView);
