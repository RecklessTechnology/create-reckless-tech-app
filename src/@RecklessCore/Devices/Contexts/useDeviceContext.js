import { useContext } from 'react';
import { DeviceContext } from '../Managers/DeviceManager';

export default function useDeviceContext() {
  return useContext(DeviceContext);
}
