import useConnectionsContext from '../../contexts/useConnectionsContext';

import RoomOpenUrlButtonView from './view';

const RoomOpenUrlButton = () => {
  const { roomInfo } = useConnectionsContext();
  const url = `${window.location.href}#${roomInfo.id}`;
  
  return <RoomOpenUrlButtonView {...{url: url}} />
}

RoomOpenUrlButton.whyDidYouRender = true;

export default RoomOpenUrlButton;