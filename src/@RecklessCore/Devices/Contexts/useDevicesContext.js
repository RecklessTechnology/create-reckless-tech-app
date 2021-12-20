import { useContext } from 'react';
import { DevicesContext } from '../Managers/DevicesManager';

export default function useDevicesContext() {
  return useContext(DevicesContext);
}
