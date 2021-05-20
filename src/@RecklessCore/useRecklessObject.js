import { useContext } from 'react';
import { RecklessObjectContext } from './RecklessObject';

export default function useRecklessObject() {
    return useContext(RecklessObjectContext);
}
