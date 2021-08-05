/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useEditorMenuContext from '../../../contexts/useEditorMenuContext';
import EditorView from './view';

const Editor = () => {
  const { editorMenuOpen, editorMenuHeight, setEditorMenuOpen } = useEditorMenuContext();

  return (
    <EditorView {...{
      editorMenuOpen,
      editorMenuHeight,
      setEditorMenuOpen,
    }}
    />
  );
};

Editor.whyDidYouRender = true;

export default Editor;
