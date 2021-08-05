/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useConnectionsContext from '../../contexts/useConnectionsContext';

import RoomCopyUrlButtonView from './view';

const RoomCopyUrlButton = () => {
  const { roomInfo } = useConnectionsContext();

  if (roomInfo === null) { return null; }

  return <RoomCopyUrlButtonView {...{ url: `${window.location.href}#${roomInfo.id}` }} />;
};

RoomCopyUrlButton.whyDidYouRender = true;

export default RoomCopyUrlButton;
