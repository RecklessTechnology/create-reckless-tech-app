/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import useEditorMenuContext from '../../../contexts/useEditorMenuContext';
import useInspectorMenuContext from '../../../contexts/useInspectorMenuContext';

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

Inspector.whyDidYouRender = true;

export default Inspector;
