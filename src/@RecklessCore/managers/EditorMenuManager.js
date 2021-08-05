/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { createContext, useMemo, useState } from 'react';

export const EditorMenuContext = createContext(null);

const EditorMenuManager = ({
  children,
}) => {
  const [editorMenuHeight, setEditorMenuHeight] = useState(500);
  const [editorMenuOpen, setEditorMenuOpen] = useState(false);
  const [editorMenuTab, setEditorMenuTab] = useState(0);

  const editorMenuContextValue = useMemo(() => ({
    editorMenuHeight,
    setEditorMenuHeight,
    editorMenuOpen,
    setEditorMenuOpen,
    editorMenuTab,
    setEditorMenuTab,
  }), [
    editorMenuHeight, setEditorMenuHeight,
    editorMenuOpen, setEditorMenuOpen,
    editorMenuTab, setEditorMenuTab,
  ]);

  return (
    <EditorMenuContext.Provider value={editorMenuContextValue}>
      {children}
    </EditorMenuContext.Provider>
  );
};

EditorMenuManager.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default EditorMenuManager;
