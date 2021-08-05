import { useContext } from 'react';
import { PeersContext } from '../managers/PeersManager';

export default function useConnectionsContext() {
  return useContext(PeersContext);
}
