/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useAppContext from '../../../../contexts/useAppContext';
import PatchToolbarView from '../../shared/PatchToolbar/view';

const PatchToolbar = ({ uuid }) => {
  const { removeThreeObj, hideThreeObjPatch } = useAppContext();
  return (
    <PatchToolbarView {...{
      uuid, removeObj: removeThreeObj, hidePatch: hideThreeObjPatch,
    }}
    />
  );
};

PatchToolbar.whyDidYouRender = true;

export default PatchToolbar;
