import PropTypes from 'prop-types';

import React, { memo } from 'react';

import MusicPlayer from './MusicPlayer';

/**
 * Patch for Controlling Devices
 */
const DevicePatch = ({
  // eslint-disable-next-line no-unused-vars
  type = 'musicPlayer',
  // eslint-disable-next-line no-unused-vars
  name = 'default',
  // eslint-disable-next-line no-unused-vars
  uuid = 'xxx',
  // eslint-disable-next-line no-unused-vars
  userData = {
    isPatchHidden: false,
  },
  data,
}) => {
  const { type: t } = data;
  switch (t.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Media Player Patch: ${t}`);
      return null;
    case 'musicplayer':
      return (<MusicPlayer {...{ data }} />);
  }
};

DevicePatch.propTypes = {
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
