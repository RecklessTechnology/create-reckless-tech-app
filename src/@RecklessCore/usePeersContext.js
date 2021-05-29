import { useContext } from 'react';
import { PeersContext } from './PeerConnection';

export default function usePeersContext() {
    return useContext(PeersContext);
}
