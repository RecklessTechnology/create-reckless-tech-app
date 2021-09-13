/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useConnectionsContext from '../../../../contexts/useConnectionsContext';

import RoomRefreshIdButtonView from './view';

const RoomRefreshIdButton = () => {
  const { setRoomInfo } = useConnectionsContext();

  return <RoomRefreshIdButtonView {...{ setRoomInfo }} />;
};

RoomRefreshIdButton.whyDidYouRender = true;

export default RoomRefreshIdButton;
