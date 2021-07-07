import { useContext } from 'react';
import { EditorMenuContext } from '../managers/EditorMenuManager';

export default function useEditorMenuContext() {
    return useContext(EditorMenuContext);
}
