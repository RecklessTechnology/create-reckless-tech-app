import PropTypes from 'prop-types';

import React, { memo } from 'react';

import PatchDetails from '../../Components/Patches/PatchDetails/index';
import PatchValue from './PatchValue/index';
import ShapePreview from './ShapePreview/index';
import PatchToolbar from './PatchToolbar/index';
import PatchRoot from '../../Components/Patches/PatchRoot';

import GeneratorSettings from './Settings';
import PropListItem from '../../Components/Patches/PropListItem';
import useAppContext from '../../App/Contexts/useAppContext';

/**
 * Patch for Controlling Generators
 */
const Generator = ({
  // eslint-disable-next-line no-unused-vars
  type = 'orbit',
  // eslint-disable-next-line no-unused-vars
  name = 'default',
  // eslint-disable-next-line no-unused-vars
  uuid = 'xxx',
  // eslint-disable-next-line no-unused-vars
  userData = {
    isPatchHidden: false,
  },
  // eslint-disable-next-line no-unused-vars
  resolution = 32,
  // eslint-disable-next-line no-unused-vars
  rpm = 30,
  // eslint-disable-next-line no-unused-vars
  looped = true,
  // eslint-disable-next-line no-unused-vars
  paused = false,

  selected,

  data,
}) => {
  const { selectedComponent } = useAppContext();

  const { uuid: uid, label, width } = data;

  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Generator Patch: ${type}`);
      return null;
    case 'generator':
      return (
        <PatchRoot
          {...{
            width,
            selected: !!((selectedComponent === uuid || selected === true)),
          }}
        >
          <PatchDetails {...{ name: `${label}`, uuid: `${uid}`, type }} />
          <ShapePreview {...{ uuid: uid, propName: 'position' }} />
          <GeneratorSettings uuid={uid} />
          <PropListItem {...{
            uuid: uid, propName: 'position', disableInput: true, disableOutput: false,
          }}
          >
            <PatchValue {...{ uuid: uid, propName: 'position' }} />
          </PropListItem>
          <PatchToolbar uuid={uid} />
        </PatchRoot>
      );
  }
};

Generator.whyDidYouRender = (process.env.NODE_ENV === 'development');

Generator.propTypes = {
  /**
   * Name of Patch.
   */
  // eslint-disable-next-line react/require-default-props
  name: PropTypes.string,
  /**
   * Type of Patch.
   */
  // eslint-disable-next-line react/require-default-props
  type: PropTypes.string,
  /**
   * Unique Patch Id.
   */
  // eslint-disable-next-line react/require-default-props
  uuid: PropTypes.string,
  /**
   * Props.
   */
  // eslint-disable-next-line react/require-default-props
  userData: PropTypes.shape({
    isPatchHidden: PropTypes.bool,
  }),
  // eslint-disable-next-line react/require-default-props
  resolution: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  rpm: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  looped: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  paused: PropTypes.bool,
  selected: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    uuid: PropTypes.string,
    label: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
};

export default memo(Generator);
