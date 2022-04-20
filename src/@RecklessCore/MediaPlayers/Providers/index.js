import React, { memo } from 'react';

import MediaPlayersView from './view';

const MediaPlayers = ({ connections, players }) => players.map((player) => (
  <MediaPlayersView
    key={`rt_${player.type}_mediaplayer_${player.uuid}`}
    connections={connections}
    {...player}
  />
));

MediaPlayers.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(MediaPlayers);
