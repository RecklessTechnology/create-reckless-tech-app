import useConnectionsContext from '../../contexts/useConnectionsContext';

import RoomCopyUrlButtonView from './view';

const RoomCopyUrlButton = () => {
  const { roomInfo } = useConnectionsContext();
  const url = `${window.location.href}#${roomInfo.id}`;
  
  return <RoomCopyUrlButtonView {...{url: url}} />
}

RoomCopyUrlButton.whyDidYouRender = true;

export default RoomCopyUrlButton;