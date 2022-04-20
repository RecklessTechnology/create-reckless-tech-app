import React from 'react';

import useAppContext from '../../../../App/Contexts/useAppContext';

import EditorToolbarView from './view';

const EditorToolbar = () => {
  const { sceneJSON } = useAppContext();
  const { object } = sceneJSON;
  const { name } = object;
  return <EditorToolbarView {...{ name }} />;
};

EditorToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default EditorToolbar;
