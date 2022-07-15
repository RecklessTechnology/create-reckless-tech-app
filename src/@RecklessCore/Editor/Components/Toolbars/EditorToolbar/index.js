import React from 'react';

import useAppContext from '../../../../App/Contexts/useAppContext';

import EditorToolbarView from './view';

const EditorToolbar = () => {
  const { getSceneNames, activeScene, changeActiveScene } = useAppContext();
  return (
    <EditorToolbarView {...{
      sceneNames: getSceneNames(),
      activeScene,
      onSetActiveScene: changeActiveScene,
    }}
    />
  );
};

EditorToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default EditorToolbar;
