import { useContext } from 'react';
import { ConnectionsContext } from '../App';

export default function useConnectionsContext() {
    return useContext(ConnectionsContext);
}
