import React from 'react';

import useEditorMenuContext from '../Editor/Contexts/useEditorMenuContext';
import useInspectorMenuContext from './Contexts/useInspectorMenuContext';

import InspectorView from './view';

const Inspector = () => {
  const { editorMenuOpen, editorMenuHeight } = useEditorMenuContext();
  const {
    inspectorMenuWidth,
    inspectorMenuOpen,
    setInspectorMenuOpen,
    inspectorMenuTab,
    setInspectorMenuTab,
  } = useInspectorMenuContext();

  return (
    <InspectorView {...{
      editorMenuOpen,
      editorMenuHeight,
      inspectorMenuWidth,
      inspectorMenuOpen,
      setInspectorMenuOpen,
      inspectorMenuTab,
      setInspectorMenuTab,
    }}
    />
  );
};

Inspector.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default Inspector;
