/* eslint-disable react/jsx-filename-extension */

import React, { forwardRef } from 'react';

import AddToEditorToolbarView from './view';

const AddToEditorToolbar = (props, ref) => (
  <AddToEditorToolbarView {...{ ref }} />
);

AddToEditorToolbar.whyDidYouRender = true;

export default forwardRef(AddToEditorToolbar);
