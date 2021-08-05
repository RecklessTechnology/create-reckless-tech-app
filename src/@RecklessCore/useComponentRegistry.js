import { useLayoutEffect } from 'react';
import useThreeObjectContext from './contexts/useThreeObjectContext';

export default function useComponentRegistry(
  name,
  api,
) {
  const { registerComponent, unregisterComponent } = useThreeObjectContext();

  useLayoutEffect(() => {
    registerComponent(name, api);
  });

  useLayoutEffect(() => () => unregisterComponent(name), [unregisterComponent, name]);

  return api;
}
