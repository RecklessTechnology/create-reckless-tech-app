import { createContext, useMemo, useState } from 'react';

export const ToolsMenuContext = createContext(null);

export default function ToolsMenuManager({
    children
}) {
  const [toolsMenuWidth, setToolsMenuWidth] = useState(500);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [toolsMenuTab, setToolsMenuTab] = useState(0);
  
  const toolsMenuContextValue = useMemo(() => ({
    toolsMenuWidth, setToolsMenuWidth,
    toolsMenuOpen, setToolsMenuOpen,
    toolsMenuTab, setToolsMenuTab,
  }),[
    toolsMenuWidth, setToolsMenuWidth,
    toolsMenuOpen, setToolsMenuOpen,
    toolsMenuTab, setToolsMenuTab,
  ]);

  return (<ToolsMenuContext.Provider value={toolsMenuContextValue}>{children}</ToolsMenuContext.Provider>)
}
