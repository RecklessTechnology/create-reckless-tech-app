import React, { memo } from 'react';

import useAppContext from '../../../App/Contexts/useAppContext';

import SelectionMenuView from './view';

const SelectionMenu = () => {
  const { selectedComponent } = useAppContext();

  return (<SelectionMenuView {...selectedComponent} />);
};

SelectionMenu.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(SelectionMenu);
