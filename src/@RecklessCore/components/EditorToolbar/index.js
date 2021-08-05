/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useAppContext from '../../contexts/useAppContext';

import EditorToolbarView from './view';

const EditorToolbar = () => {
  const { sceneJSON } = useAppContext();
  return <EditorToolbarView {...{ sceneJSON }} />;
};

EditorToolbar.whyDidYouRender = true;

export default EditorToolbar;
