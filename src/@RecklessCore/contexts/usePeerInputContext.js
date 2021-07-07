import { useContext } from 'react';
import { PeerInputContext } from '../managers/PeerInputManager';

export default function usePeerInputContext() {
    return useContext(PeerInputContext);
}
