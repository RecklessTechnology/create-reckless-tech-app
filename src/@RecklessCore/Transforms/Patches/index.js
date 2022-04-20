import PropTypes from 'prop-types';

import React from 'react';

import PatchValue from './PatchValue/index';
import PatchToolbar from './PatchToolbar/index';

import PatchDetails from '../../Components/Patches/PatchDetails/index';
import PropListItem from '../../Components/Patches/PropListItem/index';
import PatchRoot from '../../Components/Patches/PatchRoot';
import TransformSettings from './Settings';

import NativeAudioAnalyzer from './NativeAudioAnalyzer';
import AudioMotionAnalyzer from './AudioMotionAnalyzer';

const TransformPatch = ({ data }) => {
  const {
    uuid, label, width, type,
  } = data;
  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Transform Patch ${type}`);
      return (
        <PatchRoot {...{ width }}>
          <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type }} />
          <TransformSettings {...{
            uuid, propName: 'operator', type: 'select', defaultVal: 'add', data: ['add', 'subtract', 'multiply', 'divide'], disableInput: true, disableOutput: true,
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
    case 'nativeaudioanalyzer':
      return (<NativeAudioAnalyzer {...{ data }} />);
    case 'audiomotionanalyzer':
      return (<AudioMotionAnalyzer {...{ data }} />);
  }
};

TransformPatch.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string,
    width: PropTypes.number,
    label: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default TransformPatch;
