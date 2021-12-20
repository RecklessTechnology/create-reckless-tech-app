import React, { memo } from 'react';
import useAppContext from '../../App/Contexts/useAppContext';

import DevicesView from './view';

const Devices = ({ devices }) => {
  const { sceneJSON } = useAppContext();
  return devices.map((dev) => (<DevicesView key={`rt_${dev.type}_device_${dev.uuid}`} connection={sceneJSON.connections.filter((c) => (c.from === dev.uuid))[0]} {...dev} />));
};

Devices.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(Devices);
