/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import AddToEditorCloseButtonView from './view';

const AddToEditorCloseButton = (props) => (
  <AddToEditorCloseButtonView {...props} />
);

AddToEditorCloseButton.whyDidYouRender = true;

export default AddToEditorCloseButton;
