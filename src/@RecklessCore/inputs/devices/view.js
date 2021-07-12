import { memo } from 'react'

import DeviceManager, { DefaultProps } from '../../managers/DeviceManager';

const DevicesView = ({props}) => {
  return <DeviceManager {...DefaultProps} type={props.type} {...props}>

  </DeviceManager>;
}

DevicesView.whyDidYouRender = true;

export default memo(DevicesView);