/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import PatchDetails from '../shared/PatchDetails/index';
import PatchValue from './PatchValue/index';
import ShapePreview from './ShapePreview/index';
import PatchToolbar from './PatchToolbar/index';
import PatchRoot from '../shared/PatchRoot';

import GeneratorSettings from './Settings';
import PropListItem from '../shared/PropListItem';

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

Generator.whyDidYouRender = true;

Generator.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
};

export default memo(Generator);
