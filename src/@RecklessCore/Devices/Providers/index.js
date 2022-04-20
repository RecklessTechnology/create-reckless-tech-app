import React, { memo } from 'react';

import DevicesView from './view';

const Devices = ({ devices, connections }) => devices.map((dev) => (
  <DevicesView
    key={`rt_${dev.type}_device_${dev.uuid}`}
    connections={connections}
    {...dev}
  />
));

Devices.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(Devices);
