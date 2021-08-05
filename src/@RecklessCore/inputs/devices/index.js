/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import DevicesView from './view';

const Devices = ({ devices }) => devices.map((dev) => (<DevicesView key={`rt_${dev.type}_device_${dev.uuid}`} {...dev} />));

Devices.whyDidYouRender = false;

export default memo(Devices);
