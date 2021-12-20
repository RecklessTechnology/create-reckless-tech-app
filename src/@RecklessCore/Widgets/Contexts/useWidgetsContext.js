import { useContext } from 'react';
import { WidgetsContext } from '../Managers/WidgetsManager';

export default function useWidgetsContext() {
  return useContext(WidgetsContext);
}
