/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useConnectionsContext from '../../../contexts/useConnectionsContext';

import RoomNameView from './view';

const RoomName = () => {
  const { roomInfo } = useConnectionsContext();

  if (roomInfo === null) { return null; }
  return (
    <RoomNameView {...{ roomId: roomInfo.id }} />
  );
};

RoomName.whyDidYouRender = true;

export default RoomName;
