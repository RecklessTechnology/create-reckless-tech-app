import React from 'react';

import useConnectionsContext from '../../../../Connections/Contexts/useConnectionsContext';

import RoomOpenUrlButtonView from './view';

const RoomOpenUrlButton = () => {
  const { roomInfo } = useConnectionsContext();

  if (roomInfo === null) { return null; }

  return <RoomOpenUrlButtonView {...{ url: `${roomInfo.url}` }} />;
};

RoomOpenUrlButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default RoomOpenUrlButton;
