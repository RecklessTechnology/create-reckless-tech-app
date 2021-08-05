/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import PeerManager, { DefaultProps } from '../../managers/PeerManager';

const PeerView = ({ ...props }) => (
  <PeerManager {...DefaultProps} type={props.type} {...props} />
);

PeerView.whyDidYouRender = true;

export default memo(PeerView);
