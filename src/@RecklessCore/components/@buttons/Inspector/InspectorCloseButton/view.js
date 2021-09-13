/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../IconButton/view';

const InspectorCloseButtonView = ({ inspectorMenuOpen, setInspectorMenuOpen }) => (
  <IconButtonView {...{
    label: 'Close',
    handeClick: () => {
      setInspectorMenuOpen(!inspectorMenuOpen);
    },
  }}
  >
    <CloseIcon fontSize="small" />
  </IconButtonView>
);

InspectorCloseButtonView.whyDidYouRender = true;

InspectorCloseButtonView.propTypes = {
  inspectorMenuOpen: PropTypes.bool.isRequired,
  setInspectorMenuOpen: PropTypes.func.isRequired,
};

export default memo(InspectorCloseButtonView);
