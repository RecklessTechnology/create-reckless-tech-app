import { useContext } from 'react';
import { ToolsMenuContext } from '../managers/ToolsMenuManager';

export default function useToolsMenuContext() {
  return useContext(ToolsMenuContext);
}
