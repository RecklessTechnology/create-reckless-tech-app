import { useContext } from 'react';
import { ToolsMenuContext } from '../Managers/ToolsMenuManager';

export default function useToolsMenuContext() {
  return useContext(ToolsMenuContext);
}
