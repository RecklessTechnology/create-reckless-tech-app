import { useContext } from 'react';
import { TransformContext } from '../managers/TransformManager';

export default function useTransformContext() {
  return useContext(TransformContext);
}
