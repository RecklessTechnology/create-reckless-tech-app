/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { forwardRef } from 'react';

import AddToEditorToolbarView from './view';

const AddToEditorToolbar = (props, ref) => (
  <AddToEditorToolbarView {...props} {...{ ref }} />
);

AddToEditorToolbar.whyDidYouRender = true;

export default forwardRef(AddToEditorToolbar);
