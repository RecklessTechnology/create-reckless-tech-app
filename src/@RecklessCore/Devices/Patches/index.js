import PropTypes from 'prop-types';

import React, { memo } from 'react';

import MousePatch from './Mouse';
import CameraPatch from './Camera';
import KeyboardPatch from './Keyboard';
import AccelPatch from './Accel';

/**
 * Patch for Controlling Devices
 */
const DevicePatch = ({
  // eslint-disable-next-line no-unused-vars
  type = 'mouse',
  // eslint-disable-next-line no-unused-vars
  name = 'default',
  // eslint-disable-next-line no-unused-vars
  uuid = 'xxx',
  // eslint-disable-next-line no-unused-vars
  userData = {
    isPatchHidden: false,
  },
  selected,
  data,
}) => {
  const { type: t } = data;
  switch (t.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Device Patch: ${t}`);
      return null;
    case 'mouse':
      return (<MousePatch {...{ selected, data }} />);
    case 'keyboard':
      return (<KeyboardPatch {...{ selected, data }} />);
    case 'accel':
      return (<AccelPatch {...{ selected, data }} />);
    case 'camera':
      return (<CameraPatch {...{ selected, data }} />);
  }
};

DevicePatch.propTypes = {
  selected: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
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
};

export default memo(DevicePatch);
