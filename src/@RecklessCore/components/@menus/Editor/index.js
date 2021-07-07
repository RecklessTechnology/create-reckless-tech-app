import useEditorMenuContext from '../../../contexts/useEditorMenuContext';
import EditorView from './view';

const Editor = () => {
  const { editorMenuOpen, editorMenuHeight, setEditorMenuOpen } = useEditorMenuContext();

  return <EditorView {...{
    editorMenuOpen: editorMenuOpen,
    editorMenuHeight: editorMenuHeight,
    setEditorMenuOpen: setEditorMenuOpen,
  }} />;
}

Editor.whyDidYouRender = true;

export default Editor;