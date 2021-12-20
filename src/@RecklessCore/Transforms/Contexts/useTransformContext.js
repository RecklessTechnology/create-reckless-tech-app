import { useContext } from 'react';
import { TransformContext } from '../Managers/TransformManager';

export default function useTransformContext() {
  return useContext(TransformContext);
}
