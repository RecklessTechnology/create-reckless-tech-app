import PropTypes from 'prop-types';

import React, {
  createContext, useMemo, useState, useCallback,
} from 'react';

import useAppContext from '../../App/Contexts/useAppContext';

export const TransformsContext = createContext(null);
// eslint-disable-next-line import/no-mutable-exports
export let transformsContextValue = {};

const TransformsManager = ({
  children,
}) => {
  const { publish } = useAppContext();
  // Transform Connections
  const [TransformRegistry] = useState(() => new Map());

  const findTransform = useCallback((id) => TransformRegistry.get(id), [TransformRegistry]);

  const transformRegistryUtils = useMemo(
    () => ({
      findTransform,
      registerTransform(identifier, ref) {
        // register by id
        TransformRegistry.set(identifier, ref);
        publish('transforms-list-changed', ref, 'add');
      },
      unregisterTransform(identifier) {
        // unregister by id
        TransformRegistry.delete(identifier);
        publish('transforms-list-changed', identifier, 'remove');
      },
      getTransformsArray() {
        return Array.from(TransformRegistry.keys()).map((id) => TransformRegistry.get(id));
      },
    }),
    [TransformRegistry, publish, findTransform],
  );

  transformsContextValue = useMemo(() => ({
    TransformRegistry,
    ...transformRegistryUtils,
  }), [
    TransformRegistry,
    transformRegistryUtils,
  ]);

  return (
    <TransformsContext.Provider value={transformsContextValue}>
      {children}
    </TransformsContext.Provider>
  );
};

TransformsManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransformsManager;