/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import PatchValue from './PatchValue/index';
import PatchToolbar from './PatchToolbar/index';

import PatchDetails from '../shared/PatchDetails/index';
import PropListItem from '../shared/PropListItem/index';
import PatchRoot from '../shared/PatchRoot';
import TransformSettings from './Settings';

const TransformPatch = ({ data }) => {
  const {
    uuid, width, label, type,
  } = data;
  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type }} />
      <TransformSettings {...{
        uuid, propName: 'operator', type: 'select', defaultVal: 'Add', data: ['Add', 'Subtract', 'Multiply', 'Divide'], disableInput: true, disableOutput: true,
      }}
      />
      <TransformSettings {...{
        uuid, propName: 'amount', type: 'input', defaultVal: 1, data: 1, disableInput: true, disableOutput: true,
      }}
      />
      <PropListItem {...{
        uuid, propName: 'value', disableInput: false, disableOutput: false,
      }}
      >
        <PatchValue {...{ uuid, propName: 'value' }} />
      </PropListItem>
      <PatchToolbar uuid={uuid} />
    </PatchRoot>
  );
};

export default TransformPatch;
