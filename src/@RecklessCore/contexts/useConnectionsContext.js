import { useContext } from 'react';
import { ConnectionsContext } from '../managers/ConnectionsManager';

export default function useConnectionsContext() {
    return useContext(ConnectionsContext);
}
