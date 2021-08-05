/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useAppContext from '../../../../contexts/useAppContext';
import PatchToolbarView from '../../shared/PatchToolbar/view';

const PatchToolbar = ({ uuid }) => {
  const { removeGenerator } = useAppContext();
  return <PatchToolbarView {...{ parents: [], uuid, removeObj: removeGenerator }} />;
};

PatchToolbar.whyDidYouRender = true;

export default PatchToolbar;
