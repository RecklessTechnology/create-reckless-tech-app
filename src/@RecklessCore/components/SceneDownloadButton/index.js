import useAppContext from '../../contexts/useAppContext';
import SceneDownloadButttonView from './view';

const SceneDownloadButtton = ({ name }) => {
  const { sceneJSON } = useAppContext();
  return <SceneDownloadButttonView {...{ sceneJSON: sceneJSON }}/>;
}

SceneDownloadButtton.whyDidYouRender = true;

export default SceneDownloadButtton;