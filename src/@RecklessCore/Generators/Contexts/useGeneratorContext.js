import { useContext } from 'react';
import { GeneratorContext } from '../Managers/GeneratorManager';

export default function useGeneratorContext() {
  return useContext(GeneratorContext);
}
