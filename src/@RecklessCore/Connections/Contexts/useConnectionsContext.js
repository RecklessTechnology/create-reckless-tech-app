import { useContext } from 'react';
import { ConnectionsContext } from '../Managers/ConnectionsManager';

export default function useConnectionsContext() {
  return useContext(ConnectionsContext);
}
