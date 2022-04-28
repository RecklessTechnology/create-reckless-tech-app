import React from 'react';

import useAppContext from '../../../../App/Contexts/useAppContext';

import EditorToolbarView from './view';

const EditorToolbar = () => {
  const { getSceneNames } = useAppContext();
  return (
    <EditorToolbarView {...{
      sceneNames: getSceneNames(),
      activeScene: {},
      setActiveScene: () => {},
    }}
    />
  );
};

EditorToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default EditorToolbar;
