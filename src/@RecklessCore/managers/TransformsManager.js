import { createContext, useMemo, useState } from 'react';

import useAppContext from '../contexts/useAppContext';

export const TransformsContext = createContext(null);
export let transformsContextValue = {};

const TransformsManager = ({
    children
}) => {
  const { publish } = useAppContext();
    // Input Connections
  const [InputRegistry] = useState(() => new Map());
  
  const inputRegistryUtils = useMemo(
    () => ({
        findInputById(id) {
          return InputRegistry.get(id);
        },
        registerInput(identifier, ref) {
            // register by id
            InputRegistry.set(identifier, ref);
            publish('transforms-list-changed', 'add');

        },
        unregisterInput(identifier, ref) {
            // unregister by id
            InputRegistry.delete(identifier);
            publish('transforms-list-changed', 'remove');
        },
        getTransformsArray() {
          return Array.from(InputRegistry.keys()).map((id)=>InputRegistry.get(id));
        },
    }),
    [InputRegistry, publish]
  );

  transformsContextValue = useMemo(() => ({
    InputRegistry,
    ...inputRegistryUtils,
  }), [
    InputRegistry,
    inputRegistryUtils,
  ]);

    return (<TransformsContext.Provider value={transformsContextValue}>{children}</TransformsContext.Provider>)
}

export default TransformsManager;