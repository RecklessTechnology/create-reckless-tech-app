import useAppContext from "../../contexts/useAppContext";

import EditorToolbarView from './view';

const EditorToolbar = () => {
  const { sceneJSON } = useAppContext();
  return <EditorToolbarView {...{sceneJSON: sceneJSON}} />
}

EditorToolbar.whyDidYouRender = true;

export default EditorToolbar;