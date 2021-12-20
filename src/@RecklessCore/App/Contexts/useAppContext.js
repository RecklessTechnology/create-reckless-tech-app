import { useContext } from 'react';
import { AppContext } from '../Managers/AppManager';

export default function useAppContext() {
  return useContext(AppContext);
}
