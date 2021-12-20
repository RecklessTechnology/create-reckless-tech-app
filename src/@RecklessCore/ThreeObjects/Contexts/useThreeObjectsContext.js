import { useContext } from 'react';
import { ThreeObjectsContext } from '../Managers/ThreeObjectsManager';

export default function useThreeObjectsContext() {
  return useContext(ThreeObjectsContext);
}
