import { useLayoutEffect } from 'react';
import useRecklessObject from './useRecklessObject';

export default function useComponentRegistry(
    name,
    api
) {
    const { registerComponent, unregisterComponent } = useRecklessObject();

    useLayoutEffect(() => {
        registerComponent(name, api);
    });

    useLayoutEffect(() => {
        return () => unregisterComponent(name);
    }, [unregisterComponent, name]);

    return api;
}
