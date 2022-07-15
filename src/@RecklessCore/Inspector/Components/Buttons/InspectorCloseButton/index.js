import React from 'react';

import InspectorCloseButtonView from './view';

// import useInspectorMenuContext from '../../../Contexts/useInspectorMenuContext';
import useThemesContext from '../../../../Themes/Contexts/useThemesContext';

const InspectorCloseButton = () => {
  // const { inspectorMenuOpen, setInspectorMenuOpen } = useInspectorMenuContext();
  const { fontSize, showLabels } = useThemesContext();

  return (
    <InspectorCloseButtonView {...{
      // inspectorMenuOpen,
      // setInspectorMenuOpen,
      fontSize,
      showLabel: showLabels,
    }}
    />
  );
};

InspectorCloseButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default InspectorCloseButton;
