import { useContext } from 'react';
import { ThreeObjectContext } from '../managers/ThreeObjectManager';

export default function useThreeObjectContext() {
    return useContext(ThreeObjectContext);
}
