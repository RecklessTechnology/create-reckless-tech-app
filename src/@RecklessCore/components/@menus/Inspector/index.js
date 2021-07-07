import useEditorMenuContext from '../../../contexts/useEditorMenuContext';
import useInspectorMenuContext from '../../../contexts/useInspectorMenuContext';

import InspectorView from './view';

const Inspector = () => {
  const { editorMenuOpen, editorMenuHeight } = useEditorMenuContext();
  const { inspectorMenuWidth, inspectorMenuOpen, setInspectorMenuOpen, inspectorMenuTab, setInspectorMenuTab } = useInspectorMenuContext();

  return (<InspectorView {...{
    editorMenuOpen: editorMenuOpen,
    editorMenuHeight: editorMenuHeight,
    inspectorMenuWidth: inspectorMenuWidth,
    inspectorMenuOpen: inspectorMenuOpen,
    setInspectorMenuOpen: setInspectorMenuOpen,
    inspectorMenuTab: inspectorMenuTab,
    setInspectorMenuTab: setInspectorMenuTab
  }} />);
}

Inspector.whyDidYouRender = true

export default Inspector;