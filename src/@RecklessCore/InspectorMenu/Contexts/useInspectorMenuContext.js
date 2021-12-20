import { useContext } from 'react';
import { InspectorMenuContext } from '../Managers/InspectorMenuManager';

export default function useInspectorMenuContext() {
  return useContext(InspectorMenuContext);
}
