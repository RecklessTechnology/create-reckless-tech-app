import useConnectionsContext from '../../contexts/useConnectionsContext';

import RoomNameView from './view';

const RoomName = () => {
  const { roomInfo } = useConnectionsContext();

  return (
    <RoomNameView {...{roomId: roomInfo.id}} />
  );
}

RoomName.whyDidYouRender = true;

export default RoomName;
