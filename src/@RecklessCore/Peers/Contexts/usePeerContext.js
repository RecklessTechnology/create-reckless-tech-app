import { useContext } from 'react';
import { PeerContext } from '../Managers/PeerManager';

export default function usePeerContext() {
  return useContext(PeerContext);
}
