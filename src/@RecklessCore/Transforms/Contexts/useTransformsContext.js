import { useContext } from 'react';
import { TransformsContext } from '../Managers/TransformsManager';

export default function useTransformsContext() {
  return useContext(TransformsContext);
}
