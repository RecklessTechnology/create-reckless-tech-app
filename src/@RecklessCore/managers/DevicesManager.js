import { createContext, useMemo, useState } from 'react';

import useAppContext from '../contexts/useAppContext';

export const DevicesContext = createContext(null);
export let devicesContextValue = {};

const DevicesManager = ({
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
            publish('devices-list-changed', 'add');

        },
        unregisterInput(identifier, ref) {
            // unregister by id
            InputRegistry.delete(identifier);
            publish('devices-list-changed', 'remove');
        },
        getDevicesArray() {
          return Array.from(InputRegistry.keys()).map((id)=>InputRegistry.get(id));
        },
    }),
    [InputRegistry, publish]
  );

  devicesContextValue = useMemo(() => ({
    InputRegistry,
    ...inputRegistryUtils,
  }), [
    InputRegistry,
    inputRegistryUtils,
  ]);

    return (<DevicesContext.Provider value={devicesContextValue}>{children}</DevicesContext.Provider>)
}

export default DevicesManager;