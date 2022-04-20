import PropTypes from 'prop-types';

import React from 'react';

import PatchValue from '../PatchValue/index';
import PatchToolbar from '../PatchToolbar/index';

import PatchDetails from '../../../Components/Patches/PatchDetails/index';
import PropListItem from '../../../Components/Patches/PropListItem/index';
import PatchRoot from '../../../Components/Patches/PatchRoot';

const AudioMotionAnalyzerPatch = ({ data }) => {
  const {
    uuid, label, width, type,
  } = data;
  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type }} />
      <PropListItem {...{
        uuid, propName: 'audio', disableInput: false, disableOutput: true,
      }}
      >
        <PatchValue {...{ uuid, propName: 'audio' }} />
      </PropListItem>
      <PropListItem {...{
        uuid, propName: 'freqs', disableInput: true, disableOutput: false,
      }}
      >
        <PatchValue {...{ uuid, propName: 'audio' }} />
      </PropListItem>
      <PatchToolbar uuid={uuid} />
    </PatchRoot>
  );
};

AudioMotionAnalyzerPatch.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string,
    width: PropTypes.number,
    label: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default AudioMotionAnalyzerPatch;
