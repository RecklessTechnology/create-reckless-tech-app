import React from 'react';

import InspectorCloseButtonView from './view';

import useInspectorMenuContext from '../../../Contexts/useInspectorMenuContext';

const InspectorCloseButton = () => {
  const { inspectorMenuOpen, setInspectorMenuOpen } = useInspectorMenuContext();

  return <InspectorCloseButtonView {...{ inspectorMenuOpen, setInspectorMenuOpen }} />;
};

InspectorCloseButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default InspectorCloseButton;
