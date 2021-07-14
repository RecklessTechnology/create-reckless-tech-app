import { createContext, useMemo, useState } from 'react';

export const EditorMenuContext = createContext(null);

export default function EditorMenuManager({
    children
}) {
  const [editorMenuHeight, setEditorMenuHeight] = useState(500);
  const [editorMenuOpen, setEditorMenuOpen] = useState(true);
  const [editorMenuTab, setEditorMenuTab] = useState(0);
  
  const editorMenuContextValue = useMemo(() => ({
    editorMenuHeight, setEditorMenuHeight,
    editorMenuOpen, setEditorMenuOpen,
    editorMenuTab, setEditorMenuTab,
  }),[
    editorMenuHeight, setEditorMenuHeight,
    editorMenuOpen, setEditorMenuOpen,
    editorMenuTab, setEditorMenuTab,
  ]);
  
  return (<EditorMenuContext.Provider value={editorMenuContextValue}>{children}</EditorMenuContext.Provider>)
}
