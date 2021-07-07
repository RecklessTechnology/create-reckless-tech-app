import { useContext } from 'react';
import { PeerOutputContext } from '../managers/PeerOutputManager';

export default function usePeerOutputContext() {
    return useContext(PeerOutputContext);
}
