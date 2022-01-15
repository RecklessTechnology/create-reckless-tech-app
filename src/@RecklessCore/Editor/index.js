import React from 'react';

import useEditorMenuContext from './Contexts/useEditorMenuContext';
import EditorView from './view';

const EditorMenu = () => {
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

EditorMenu.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default EditorMenu;
