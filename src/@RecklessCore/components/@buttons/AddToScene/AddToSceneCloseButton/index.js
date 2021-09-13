/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import AddToSceneCloseButtonView from './view';

const AddToSceneCloseButton = (props) => (
  <AddToSceneCloseButtonView {...props} />
);

AddToSceneCloseButton.whyDidYouRender = true;

export default AddToSceneCloseButton;
