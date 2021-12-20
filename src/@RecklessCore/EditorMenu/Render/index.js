import React from 'react';

import useEditorMenuContext from '../Contexts/useEditorMenuContext';
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

Editor.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default Editor;
