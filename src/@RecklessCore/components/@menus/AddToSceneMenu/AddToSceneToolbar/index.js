/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { forwardRef } from 'react';

import AddToSceneToolbarView from './view';

const AddToSceneToolbar = (props, ref) => (
  <AddToSceneToolbarView {...props} {...{ ref }} />
);

AddToSceneToolbar.whyDidYouRender = true;

export default forwardRef(AddToSceneToolbar);
