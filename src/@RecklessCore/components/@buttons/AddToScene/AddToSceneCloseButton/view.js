/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../IconButton/view';

const AddToSceneCloseButtonView = ({ handleClose }) => (
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

AddToSceneCloseButtonView.whyDidYouRender = true;

export default memo(AddToSceneCloseButtonView);
