/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useAppContext from '../../../../contexts/useAppContext';
import PatchToolbarView from '../../shared/PatchToolbar/view';

const PatchToolbar = ({ uuid }) => {
  const { removePeer, hidePeerPatch } = useAppContext();
  return (
    <PatchToolbarView {...{
      uuid, removeObj: removePeer, hidePatch: hidePeerPatch,
    }}
    />
  );
};

PatchToolbar.whyDidYouRender = true;

export default PatchToolbar;
