import PropTypes from 'prop-types';

import React, { useEffect } from 'react';

import PatchValue from '../PatchValue/index';
import PatchToolbar from '../PatchToolbar/index';

import PatchDetails from '../../../Components/Patches/PatchDetails/index';
import PropListItem from '../../../Components/Patches/PropListItem/index';
import PatchRoot from '../../../Components/Patches/PatchRoot';
import useAppContext from '../../../App/Contexts/useAppContext';

const NativeAudioAnalyzerPatch = ({ selected, data }) => {
  const { selectedComponent, setSelectedComponent } = useAppContext();
  const {
    uuid, label, width, type,
  } = data;

  useEffect(() => {
    setSelectedComponent({ uuid, label, type });
  }, [label, selected, setSelectedComponent, type, uuid]);

  return (
    <PatchRoot
      {...{
        width,
        selected: !!((selectedComponent === uuid || selected === true)),
      }}
    >
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

NativeAudioAnalyzerPatch.propTypes = {
  selected: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    uuid: PropTypes.string,
    width: PropTypes.number,
    label: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default NativeAudioAnalyzerPatch;
