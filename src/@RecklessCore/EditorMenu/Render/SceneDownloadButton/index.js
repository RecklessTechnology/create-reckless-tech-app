import React from 'react';

import useAppContext from '../../../App/Contexts/useAppContext';
import SceneDownloadButttonView from './view';

const SceneDownloadButtton = () => {
  const { sceneJSON } = useAppContext();
  return <SceneDownloadButttonView {...{ sceneJSON }} />;
};

SceneDownloadButtton.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default SceneDownloadButtton;
