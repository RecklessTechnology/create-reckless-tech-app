/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import InspectorCloseButtonView from './view';

import useInspectorMenuContext from '../../contexts/useInspectorMenuContext';

const InspectorCloseButton = () => {
  const { inspectorMenuOpen, setInspectorMenuOpen } = useInspectorMenuContext();

  return <InspectorCloseButtonView {...{ inspectorMenuOpen, setInspectorMenuOpen }} />;
};

InspectorCloseButton.whyDidYouRender = true;

export default InspectorCloseButton;
