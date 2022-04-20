/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';

import { memo } from 'react';

import MediaPlayerManager, { DefaultProps } from '../Managers/MediaPlayerManager';

import MusicPlayer from './MusicPlayer';

// eslint-disable-next-line react/prop-types
const MediaPlayersView = ({ connections, type, ...props }) => {
  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Media Player: ${type}`);
      return null;
    case 'musicplayer':
      return (
        <MediaPlayerManager connections={connections} {...DefaultProps} type={type} {...props}>
          <MusicPlayer {...props} />
        </MediaPlayerManager>
      );
  }
};

MediaPlayersView.whyDidYouRender = (process.env.NODE_ENV === 'development');

MediaPlayersView.propTypes = {
  type: PropTypes.string.isRequired,
};

export default memo(MediaPlayersView);
