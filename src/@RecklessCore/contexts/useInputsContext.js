import { useContext } from 'react';
import { DevicesContext } from '../managers/DevicesManager';

export default function useDevicesContext() {
    return useContext(DevicesContext);
}
