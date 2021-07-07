import useAppContext from '../../contexts/useAppContext';
import useConnectionsContext from '../../contexts/useConnectionsContext';

import ShareSceneEveryoneButtonView from './view';

const ShareSceneEveryoneButton = () => {
  const { sceneJSON } = useAppContext();
  const { me } = useConnectionsContext();

  return <ShareSceneEveryoneButtonView {...{me: me, sceneJSON: sceneJSON}}/>;
}

ShareSceneEveryoneButton.whyDidYouRender = true;

export default ShareSceneEveryoneButton;