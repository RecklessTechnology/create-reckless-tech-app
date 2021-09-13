/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import PropListItem from '../shared/PropListItem/index';
import PatchValue from './PatchValue/index';
import PatchDetails from '../shared/PatchDetails/index';
import ParentChildProp from '../shared/ParentChildPro/index';
import PatchToolbar from './PatchToolbar/index';
import PatchRoot from '../shared/PatchRoot';
import useAppContext from '../../../contexts/useAppContext';

const ThreeObjectPatch = ({ data }) => {
  const {
    uuid, label, type, width, children, isChildHidden, isHidden,
  } = data;

  const { hideThreeObjPatch } = useAppContext();

  const props = [
    {
      uuid, propName: 'position', disableInput: false, disableOutput: true,
    },
    {
      uuid, propName: 'rotation', disableInput: false, disableOutput: true,
    },
    {
      uuid, propName: 'scale', disableInput: false, disableOutput: true,
    },
  ];

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type }} />
      <ParentChildProp {...{
        isChildHidden, type, uuid, children, isHidden, hidePatch: hideThreeObjPatch,
      }}
      />
      {
        props.map((p) => (
          <PropListItem key={`${p.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: p.uuid, propName: p.propName }} /></PropListItem>
        ))
      }
      <PatchToolbar uuid={uuid} />
    </PatchRoot>
  );
};

export default ThreeObjectPatch;
