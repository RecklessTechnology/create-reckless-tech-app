import { useContext } from 'react';
import { GeneratorsContext } from '../Managers/GeneratorsManager';

export default function useGeneratorsContext() {
  return useContext(GeneratorsContext);
}
