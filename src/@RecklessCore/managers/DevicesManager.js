/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { createContext, useMemo, useState } from 'react';

import useAppContext from '../contexts/useAppContext';

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
        return DeviceRegistry.get(id);
      },
      registerDevice(identifier, ref) {
        // register by id
        DeviceRegistry.set(identifier, ref);
        publish('devices-list-changed', 'add');
      },
      unregisterDevice(identifier) {
        // unregister by id
        DeviceRegistry.delete(identifier);
        publish('devices-list-changed', 'remove');
      },
      getDevicesArray() {
        return Array.from(DeviceRegistry.keys()).map((id) => DeviceRegistry.get(id));
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
  children: PropTypes.shape([]).isRequired,
};

export default DevicesManager;
