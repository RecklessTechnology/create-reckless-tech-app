import React, { memo } from 'react';
import useAppContext from '../../App/Contexts/useAppContext';

import MediaPlayersView from './view';

const MediaPlayers = ({ players }) => {
  const { sceneJSON } = useAppContext();
  return players.map((player) => (<MediaPlayersView key={`rt_${player.type}_device_${player.uuid}`} connection={sceneJSON.connections.filter((c) => (c.from === player.uuid))[0]} {...player} />));
};

MediaPlayers.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(MediaPlayers);
