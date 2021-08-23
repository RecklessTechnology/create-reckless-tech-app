/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import PatchDetails from '../shared/PatchDetails/index';

import ParentChildProp from '../shared/ParentChildPro/index';
import PatchRoot from '../shared/PatchRoot';
import useAppContext from '../../../contexts/useAppContext';

const ScenePatch = ({ data }) => {
  const {
    uuid, label, type, width, children, isChildHidden, isHidden,
  } = data;

  const { hideThreeObjPatch } = useAppContext();

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type: 'Scene' }} />
      <ParentChildProp {...{
        isChildHidden, type, uuid, children, isHidden, hidePatch: hideThreeObjPatch,
      }}
      />
    </PatchRoot>
  );
};

export default ScenePatch;
