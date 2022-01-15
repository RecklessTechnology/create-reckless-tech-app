import React from 'react';

import useConnectionsContext from '../../../../Connections/Contexts/useConnectionsContext';

import RoomCopyUrlButtonView from './view';

const RoomCopyUrlButton = () => {
  const { roomInfo } = useConnectionsContext();

  if (roomInfo === null) { return null; }

  return <RoomCopyUrlButtonView {...{ url: `${roomInfo.url}` }} />;
};

RoomCopyUrlButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default RoomCopyUrlButton;
