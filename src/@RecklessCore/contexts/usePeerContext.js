import { useContext } from 'react';
import { PeerContext } from '../managers/PeerManager';

export default function usePeerContext() {
    return useContext(PeerContext);
}
