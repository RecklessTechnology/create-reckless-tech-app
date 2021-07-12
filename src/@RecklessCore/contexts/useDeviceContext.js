import { useContext } from 'react';
import { DeviceContext } from '../managers/DeviceManager';

export default function useDeviceContext() {
    return useContext(DeviceContext);
}
