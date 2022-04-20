import PropTypes from 'prop-types';

import React, { createContext, useMemo, useState } from 'react';

import useAppContext from '../../App/Contexts/useAppContext';

export const WidgetsContext = createContext(null);
WidgetsContext.displayName = 'Widgets Context';

// eslint-disable-next-line import/no-mutable-exports
export let widgetsContextValue = {};

const WidgetsManager = ({
  children,
}) => {
  const { publish } = useAppContext();
  // Widget Connections
  const [WidgetRegistry] = useState(() => new Map());

  const widgetRegistryUtils = useMemo(
    () => ({
      findWidget(id) {
        return WidgetRegistry.get(id.toLowerCase());
      },
      registerWidget(identifier, ref) {
        // register by id
        WidgetRegistry.set(identifier.toLowerCase(), ref);
        publish('widgets-list-changed', ref, 'add');
      },
      unregisterWidget(identifier) {
        // unregister by id
        WidgetRegistry.delete(identifier.toLowerCase());
        publish('widgets-list-changed', identifier, 'remove');
      },
      getWidgetsArray() {
        return Array.from(WidgetRegistry.keys()).map((id) => WidgetRegistry.get(id.toLowerCase()));
      },
    }),
    [WidgetRegistry, publish],
  );

  widgetsContextValue = useMemo(() => ({
    WidgetRegistry,
    ...widgetRegistryUtils,
  }), [
    WidgetRegistry,
    widgetRegistryUtils,
  ]);

  return (
    <WidgetsContext.Provider value={widgetsContextValue}>
      {children}
    </WidgetsContext.Provider>
  );
};

WidgetsManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WidgetsManager;
