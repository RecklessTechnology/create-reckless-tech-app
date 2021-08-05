import { useContext } from 'react';
import { GeneratorsContext } from '../managers/GeneratorsManager';

export default function useGeneratorsContext() {
  return useContext(GeneratorsContext);
}
