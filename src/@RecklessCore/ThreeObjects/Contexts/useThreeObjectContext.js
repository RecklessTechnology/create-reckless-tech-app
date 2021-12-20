import { useContext } from 'react';
import { ThreeObjectContext } from '../Managers/ThreeObjectManager';

export default function useThreeObjectContext() {
  return useContext(ThreeObjectContext);
}
