import PropTypes from 'prop-types';

import React, { memo } from 'react';

import PatchDetails from '../../Components/Patches/PatchDetails/index';
import PatchValue from './PatchValue/index';
import ShapePreview from './ShapePreview/index';
import PatchToolbar from './PatchToolbar/index';
import PatchRoot from '../../Components/Patches/PatchRoot';

import GeneratorSettings from './Settings';
import PropListItem from '../../Components/Patches/PropListItem';

const Generator = ({ data }) => {
  const { uuid, label, width } = data;

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type: 'Generator' }} />
      <ShapePreview {...{ uuid, propName: 'position' }} />
      <GeneratorSettings uuid={uuid} />
      <PropListItem {...{
        uuid, propName: 'position', disableInput: true, disableOutput: false,
      }}
      >
        <PatchValue {...{ uuid, propName: 'position' }} />
      </PropListItem>
      <PatchToolbar uuid={uuid} />
    </PatchRoot>
  );
};

Generator.whyDidYouRender = (process.env.NODE_ENV === 'development');

Generator.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string,
    label: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
};

export default memo(Generator);
