import { useContext } from 'react';
import { ThreeObjectsContext } from '../managers/ThreeObjectsManager';

export default function useThreeObjectsContext() {
  return useContext(ThreeObjectsContext);
}
