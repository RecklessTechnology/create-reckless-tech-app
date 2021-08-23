/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { createContext, useMemo, useState } from 'react';

import useAppContext from '../contexts/useAppContext';

export const GeneratorsContext = createContext(null);
// eslint-disable-next-line import/no-mutable-exports
export let generatorsContextValue = {};

const GeneratorsManager = ({
  children,
}) => {
  const { publish } = useAppContext();
  // Generator Connections
  const [GeneratorRegistry] = useState(() => new Map());

  const generatorRegistryUtils = useMemo(
    () => ({
      findGenerator(id) {
        return GeneratorRegistry.get(id);
      },
      registerGenerator(identifier, ref) {
        // register by id
        GeneratorRegistry.set(identifier, ref);
        publish('generators-list-changed', 'add');
      },
      unregisterGenerator(identifier) {
        // unregister by id
        GeneratorRegistry.delete(identifier);
        publish('generators-list-changed', 'remove');
      },
      getGeneratorsArray() {
        return Array.from(GeneratorRegistry.keys()).map((id) => GeneratorRegistry.get(id));
      },
    }),
    [GeneratorRegistry, publish],
  );

  generatorsContextValue = useMemo(() => ({
    GeneratorRegistry,
    ...generatorRegistryUtils,
  }), [
    GeneratorRegistry,
    generatorRegistryUtils,
  ]);

  return (
    <GeneratorsContext.Provider value={generatorsContextValue}>
      {children}
    </GeneratorsContext.Provider>
  );
};

GeneratorsManager.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

GeneratorsManager.whyDidYouRender = false;

export default GeneratorsManager;
