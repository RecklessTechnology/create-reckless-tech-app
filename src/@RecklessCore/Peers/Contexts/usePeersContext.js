import { useContext } from 'react';
import { PeersContext } from '../Managers/PeersManager';

export default function useConnectionsContext() {
  return useContext(PeersContext);
}
