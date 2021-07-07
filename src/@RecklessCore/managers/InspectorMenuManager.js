import { createContext, useMemo, useState } from 'react';

export const InspectorMenuContext = createContext(null);

export default function InspectorMenuManager({
    children
}) {
  const [inspectorMenuWidth, setInspectorMenuWidth] = useState(375);
  const [inspectorMenuOpen, setInspectorMenuOpen] = useState(true);
  const [inspectorMenuTab, setInspectorMenuTab] = useState(1);
  
  const inspectorMenuContextValue = useMemo(() => ({
    inspectorMenuWidth, setInspectorMenuWidth,
    inspectorMenuOpen, setInspectorMenuOpen,
    inspectorMenuTab, setInspectorMenuTab,
  }),[
    inspectorMenuWidth, setInspectorMenuWidth,
    inspectorMenuOpen, setInspectorMenuOpen,
    inspectorMenuTab, setInspectorMenuTab,
  ]);
  
  return (<InspectorMenuContext.Provider value={inspectorMenuContextValue}>{children}</InspectorMenuContext.Provider>)
}
