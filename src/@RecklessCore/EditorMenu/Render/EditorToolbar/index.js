import React from 'react';

import useAppContext from '../../../App/Contexts/useAppContext';

import EditorToolbarView from './view';

const EditorToolbar = () => {
  const { sceneJSON } = useAppContext();
  return <EditorToolbarView {...{ sceneJSON }} />;
};

EditorToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default EditorToolbar;
