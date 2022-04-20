import PropTypes from 'prop-types';

import React, { createContext, useMemo, useState } from 'react';

import useAppContext from '../../App/Contexts/useAppContext';

export const MediaPlayersContext = createContext(null);
MediaPlayersContext.displayName = 'Media Players Context';

// eslint-disable-next-line import/no-mutable-exports
export let mediaPlayersContextValue = {};

const MediaPlayersManager = ({
  children,
}) => {
  const { publish } = useAppContext();
  // MediaPlayer Connections
  const [MediaPlayerRegistry] = useState(() => new Map());

  const mediaPlayerRegistryUtils = useMemo(
    () => ({
      findMediaPlayer(id) {
        return MediaPlayerRegistry.get(id.toLowerCase());
      },
      registerMediaPlayer(identifier, ref) {
        // register by id
        MediaPlayerRegistry.set(identifier.toLowerCase(), ref);
        publish('mediaPlayers-list-changed', ref, 'add');
      },
      unregisterMediaPlayer(identifier) {
        // unregister by id
        MediaPlayerRegistry.delete(identifier.toLowerCase());
        publish('mediaPlayers-list-changed', identifier, 'remove');
      },
      getMediaPlayersArray() {
        return Array.from(
          MediaPlayerRegistry.keys(),
        ).map((id) => MediaPlayerRegistry.get(id.toLowerCase()));
      },
    }),
    [MediaPlayerRegistry, publish],
  );

  mediaPlayersContextValue = useMemo(() => ({
    MediaPlayerRegistry,
    ...mediaPlayerRegistryUtils,
  }), [
    MediaPlayerRegistry,
    mediaPlayerRegistryUtils,
  ]);

  return (
    <MediaPlayersContext.Provider value={mediaPlayersContextValue}>
      {children}
    </MediaPlayersContext.Provider>
  );
};

MediaPlayersManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MediaPlayersManager;
