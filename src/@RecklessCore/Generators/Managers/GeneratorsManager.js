import PropTypes from 'prop-types';

import React, { createContext, useMemo, useState } from 'react';

import useAppContext from '../../App/Contexts/useAppContext';

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
        return GeneratorRegistry.get(id.toLowerCase());
      },
      registerGenerator(identifier, ref) {
        // register by id
        GeneratorRegistry.set(identifier.toLowerCase(), ref);
        publish('generators-list-changed', ref, 'add');
      },
      unregisterGenerator(identifier) {
        // unregister by id
        GeneratorRegistry.delete(identifier.toLowerCase());
        publish('generators-list-changed', identifier, 'remove');
      },
      getGeneratorsArray() {
        return Array.from(
          GeneratorRegistry.keys(),
        ).map((id) => GeneratorRegistry.get(id.toLowerCase()));
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
  children: PropTypes.node.isRequired,
};

GeneratorsManager.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default GeneratorsManager;
