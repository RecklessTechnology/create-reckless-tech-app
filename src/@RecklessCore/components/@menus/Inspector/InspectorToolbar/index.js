/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { forwardRef } from 'react';

import InspectorToolbarView from './view';

const InspectorToolbar = (props, ref) => (
  <InspectorToolbarView {...props} {...{ ref }} />
);

InspectorToolbar.whyDidYouRender = true;

export default forwardRef(InspectorToolbar);
