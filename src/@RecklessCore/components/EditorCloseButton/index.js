/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import EditorCloseButtonView from './view';

import useEditorMenuContext from '../../contexts/useEditorMenuContext';

const EditorCloseButton = () => {
  const { editorMenuOpen, setEditorMenuOpen } = useEditorMenuContext();

  return (
    <EditorCloseButtonView {...{ editorMenuOpen, setEditorMenuOpen }} />);
};

EditorCloseButton.whyDidYouRender = true;

export default EditorCloseButton;
