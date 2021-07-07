import EditorCloseButtonView from './view';

import useEditorMenuContext from '../../contexts/useEditorMenuContext';

const EditorCloseButton = ({ name }) => {
  const { editorMenuOpen, setEditorMenuOpen } = useEditorMenuContext();

  return <EditorCloseButtonView {...{ editorMenuOpen: editorMenuOpen, setEditorMenuOpen: setEditorMenuOpen }}/>;
}

EditorCloseButton.whyDidYouRender = true;

export default EditorCloseButton;