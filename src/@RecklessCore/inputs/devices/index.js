import { memo } from 'react'

import DevicesView from './view';

const Devices = ({devices}) => {
  return devices.map((device)=>{
    return (<DevicesView key={`rt_${device.type}_device_${device.uuid}`} {...{props: device}}/>);
  })
  
}

Devices.whyDidYouRender = false;

export default memo(Devices);