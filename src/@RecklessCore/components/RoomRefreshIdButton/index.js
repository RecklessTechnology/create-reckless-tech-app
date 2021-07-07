import useConnectionsContext from '../../contexts/useConnectionsContext';

import RoomRefreshIdButtonView from './view';

const RoomRefreshIdButton = () => {
  const { setRoomInfo } = useConnectionsContext();
  
  return <RoomRefreshIdButtonView {...{setRoomInfo: setRoomInfo}}/>;
}

RoomRefreshIdButton.whyDidYouRender = true;

export default RoomRefreshIdButton;