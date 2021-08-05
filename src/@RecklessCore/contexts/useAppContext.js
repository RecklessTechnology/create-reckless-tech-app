import { useContext } from 'react';
import { AppContext } from '../managers/AppManager';

export default function useAppContext() {
  return useContext(AppContext);
}
