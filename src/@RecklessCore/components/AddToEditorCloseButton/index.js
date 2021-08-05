/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import AddToEditorCloseButtonView from './view';

const AddToEditorCloseButton = ({ handleClose }) => (
  <AddToEditorCloseButtonView handleClose={handleClose} />
);

AddToEditorCloseButton.whyDidYouRender = true;

export default AddToEditorCloseButton;
