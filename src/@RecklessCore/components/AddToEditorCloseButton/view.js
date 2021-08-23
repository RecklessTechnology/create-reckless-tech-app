/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../@buttons/IconButton/view';

const AddToEditorCloseButtonView = ({ handleClose }) => (
  <IconButtonView {...{
    label: 'Close',
    handeClick: (evt) => {
      handleClose(evt);
    },
  }}
  >
    <CloseIcon fontSize="small" />
  </IconButtonView>
);

AddToEditorCloseButtonView.whyDidYouRender = true;

export default memo(AddToEditorCloseButtonView);
