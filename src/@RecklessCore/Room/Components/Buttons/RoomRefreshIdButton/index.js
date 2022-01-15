import React from 'react';

import useConnectionsContext from '../../../../Connections/Contexts/useConnectionsContext';

import RoomRefreshIdButtonView from './view';

const RoomRefreshIdButton = () => {
  const { setRoomInfo } = useConnectionsContext();

  return <RoomRefreshIdButtonView {...{ setRoomInfo }} />;
};

RoomRefreshIdButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default RoomRefreshIdButton;
