import { createContext, useMemo, useState, useCallback } from 'react';

import useAppContext from '../contexts/useAppContext';

export const TransformsContext = createContext(null);
export let transformsContextValue = {};

const TransformsManager = ({
    children
}) => {
  const { publish } = useAppContext();
    // Transform Connections
  const [TransformRegistry] = useState(() => new Map());
  
  const findTransform = useCallback((id) => {
    return TransformRegistry.get(id);
  },[TransformRegistry]);

  const transformRegistryUtils = useMemo(
    () => ({
        findTransform,
        registerTransform(identifier, ref) {
            // register by id
            TransformRegistry.set(identifier, ref);
            publish('transforms-list-changed', 'add');

        },
        unregisterTransform(identifier, ref) {
            // unregister by id
            TransformRegistry.delete(identifier);
            publish('transforms-list-changed', 'remove');
        },
        getTransformsArray() {
          return Array.from(TransformRegistry.keys()).map((id)=>TransformRegistry.get(id));
        },
    }),
    [TransformRegistry, publish, findTransform]
  );

  transformsContextValue = useMemo(() => ({
    TransformRegistry,
    ...transformRegistryUtils,
  }), [
    TransformRegistry,
    transformRegistryUtils,
  ]);

    return (<TransformsContext.Provider value={transformsContextValue}>{children}</TransformsContext.Provider>)
}

export default TransformsManager;