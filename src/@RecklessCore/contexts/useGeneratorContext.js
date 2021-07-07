import { useContext } from 'react';
import { GeneratorContext } from '../managers/GeneratorManager';

export default function useGeneratorContext() {
    return useContext(GeneratorContext);
}
