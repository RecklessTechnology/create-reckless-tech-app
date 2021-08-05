/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useAppContext from '../../../../contexts/useAppContext';
import PatchToolbarView from '../../shared/PatchToolbar/view';

const PatchToolbar = ({ parents, uuid }) => {
  const { removeTransform } = useAppContext();
  return <PatchToolbarView {...{ parents, uuid, removeObj: removeTransform }} />;
};

PatchToolbar.whyDidYouRender = true;

export default PatchToolbar;
