/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useConnectionsContext from '../../contexts/useConnectionsContext';

import RoomOpenUrlButtonView from './view';

const RoomOpenUrlButton = () => {
  const { roomInfo } = useConnectionsContext();

  if (roomInfo === null) { return null; }

  return <RoomOpenUrlButtonView {...{ url: `${window.location.href}#${roomInfo.id}` }} />;
};

RoomOpenUrlButton.whyDidYouRender = true;

export default RoomOpenUrlButton;
