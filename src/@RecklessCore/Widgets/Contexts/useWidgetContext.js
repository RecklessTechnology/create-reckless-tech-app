import { useContext } from 'react';
import { WidgetContext } from '../Managers/WidgetManager';

export default function useWidgetContext() {
  return useContext(WidgetContext);
}
