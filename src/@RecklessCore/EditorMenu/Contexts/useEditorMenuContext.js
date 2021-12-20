import { useContext } from 'react';
import { EditorMenuContext } from '../Managers/EditorMenuManager';

export default function useEditorMenuContext() {
  return useContext(EditorMenuContext);
}
