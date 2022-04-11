/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';

import { memo } from 'react';

import MediaPlayerManager, { DefaultProps } from '../Managers/MediaPlayerManager';

import MusicPlayer from './MusicPlayer';

// eslint-disable-next-line react/prop-types
const MediaPlayersView = ({ connection, type, ...props }) => {
  switch (type.toLowerCase()) {
    default:
    case 'musicplayer':
      return (
        <MediaPlayerManager {...DefaultProps} type={type} {...props}>
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
