import { useContext } from 'react';
import { ThemesContext } from '../Managers/ThemesManager';

export default function useThemesContext() {
  return useContext(ThemesContext);
}
