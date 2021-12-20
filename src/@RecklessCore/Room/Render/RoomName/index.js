import React from 'react';

import useConnectionsContext from '../../../Connections/Contexts/useConnectionsContext';

import RoomNameView from './view';

const RoomName = () => {
  const { roomInfo } = useConnectionsContext();

  if (roomInfo === null) { return null; }
  return (
    <RoomNameView {...{ roomId: roomInfo.id }} />
  );
};

RoomName.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default RoomName;
