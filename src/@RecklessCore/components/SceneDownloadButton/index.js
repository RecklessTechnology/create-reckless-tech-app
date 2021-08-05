/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useAppContext from '../../contexts/useAppContext';
import SceneDownloadButttonView from './view';

const SceneDownloadButtton = () => {
  const { sceneJSON } = useAppContext();
  return <SceneDownloadButttonView {...{ sceneJSON }} />;
};

SceneDownloadButtton.whyDidYouRender = true;

export default SceneDownloadButtton;
