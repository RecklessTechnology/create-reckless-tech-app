import { useContext } from 'react';
import { AppContext } from '../App';

export default function useAppContext() {
    return useContext(AppContext);
}
