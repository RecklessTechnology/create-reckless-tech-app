import { useContext } from 'react';
import { PeersContext } from '../managers/PeersManager';

export default function usePeersContext() {
    return useContext(PeersContext);
}
