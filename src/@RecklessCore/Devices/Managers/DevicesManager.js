import PropTypes from 'prop-types';

import React, { createContext, useMemo, useState } from 'react';

import useAppContext from '../../App/Contexts/useAppContext';

export const DevicesContext = createContext(null);
// eslint-disable-next-line import/no-mutable-exports
export let devicesContextValue = {};

const DevicesManager = ({
  children,
}) => {
  const { publish } = useAppContext();
  // Device Connections
  const [DeviceRegistry] = useState(() => new Map());

  const deviceRegistryUtils = useMemo(
    () => ({
      findDevice(id) {
        return DeviceRegistry.get(id.toLowerCase());
      },
      registerDevice(identifier, ref) {
        // register by id
        DeviceRegistry.set(identifier.toLowerCase(), ref);
        publish('devices-list-changed', ref, 'add');
      },
      unregisterDevice(identifier) {
        // unregister by id
        DeviceRegistry.delete(identifier.toLowerCase());
        publish('devices-list-changed', identifier, 'remove');
      },
      getDevicesArray() {
        return Array.from(DeviceRegistry.keys()).map((id) => DeviceRegistry.get(id.toLowerCase()));
      },
    }),
    [DeviceRegistry, publish],
  );

  devicesContextValue = useMemo(() => ({
    DeviceRegistry,
    ...deviceRegistryUtils,
  }), [
    DeviceRegistry,
    deviceRegistryUtils,
  ]);

  return (
    <DevicesContext.Provider value={devicesContextValue}>
      {children}
    </DevicesContext.Provider>
  );
};

DevicesManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DevicesManager;
