/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const InspectorCloseButtonView = ({ inspectorMenuOpen, setInspectorMenuOpen }) => (
  <IconButton onClick={() => {
    setInspectorMenuOpen(!inspectorMenuOpen);
  }}
  >
    <CloseIcon />
  </IconButton>
);

InspectorCloseButtonView.whyDidYouRender = true;

InspectorCloseButtonView.propTypes = {
  inspectorMenuOpen: PropTypes.bool.isRequired,
  setInspectorMenuOpen: PropTypes.func.isRequired,
};

export default memo(InspectorCloseButtonView);
