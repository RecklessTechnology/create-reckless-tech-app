import PropTypes from 'prop-types';

import React from 'react';

import PatchToolbar from '../PatchToolbar/index';
import PatchValue from '../PatchValue/index';

import PropListItem from '../../../Components/Patches/PropListItem/index';
import PatchDetails from '../../../Components/Patches/PatchDetails/index';
import PatchRoot from '../../../Components/Patches/PatchRoot';

const MousePatch = ({ data }) => {
  const {
    uuid, width, label, type,
  } = data;

  const patchProps = [
    {
      uuid, propName: 'position', disableInput: true, disableOutput: false,
    },
  ];

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type }} />
      {patchProps.map((p) => (<PropListItem key={`${p.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: p.uuid, propName: p.propName }} /></PropListItem>))}
      <PatchToolbar uuid={uuid} />
    </PatchRoot>
  );
};

MousePatch.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default MousePatch;
