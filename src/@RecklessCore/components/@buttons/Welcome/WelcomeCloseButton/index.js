/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../IconButton/view';

const WelcomeCloseButton = ({ handleClose }) => (
  <IconButtonView {...{
    label: 'Close',
    handeClick: () => {
      handleClose();
    },
  }}
  >
    <CloseIcon fontSize="small" />
  </IconButtonView>
);

WelcomeCloseButton.whyDidYouRender = true;

export default WelcomeCloseButton;
