/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, {
  useEffect, createContext, useMemo, useState, useCallback,
} from 'react';
import useAppContext from '../contexts/useAppContext';

export const ThreeObjectsContext = createContext(null);
// eslint-disable-next-line import/no-mutable-exports
export let threeObjectsContextValue = {};

const ThreeObjectsManager = ({
  children,
}) => {
  const { subscribe, publish } = useAppContext();
  const [ThreeObjectRegistry] = useState(() => new Map());
  const [ThreeObjectRegistryByName] = useState(() => new Map());
  const [ThreeObjectRegistryByPos] = useState(() => new Map());
  const [ThreeObjectRegistryByType] = useState(() => new Map());

  const exitScene = useCallback(() => {
    if (ThreeObjectRegistry !== undefined) { ThreeObjectRegistry.clear(); }
    if (ThreeObjectRegistryByName !== undefined) { ThreeObjectRegistryByName.clear(); }
    if (ThreeObjectRegistryByPos !== undefined) { ThreeObjectRegistryByPos.clear(); }
    if (ThreeObjectRegistryByType !== undefined) { ThreeObjectRegistryByType.clear(); }
  }, [
    ThreeObjectRegistry,
    ThreeObjectRegistryByType,
    ThreeObjectRegistryByName,
    ThreeObjectRegistryByPos,
  ]);
  useEffect(() => subscribe('scene-exit', exitScene), [subscribe, exitScene]);

  const threeObjectsRegistryUtils = useMemo(
    () => ({
      registerThreeObject(identifier, ref) {
      // register by id
        ThreeObjectRegistry.set(identifier, ref);
        // register by name
        ThreeObjectRegistryByName.set(ref.name, ref);
        // register by position
        const { position } = ref;
        const pos = `${position.x},${position.y},${position.z}`;
        const posList = ThreeObjectRegistryByPos.get(pos) || [];
        posList.push(ref);
        ThreeObjectRegistryByPos.set(pos, posList);

        publish('threeObjects-list-changed', 'add');
      },
      unregisterThreeObject(identifier, ref) {
      // unregister by id
        ThreeObjectRegistry.delete(identifier);
        // unregister by name
        ThreeObjectRegistryByName.delete(ref.name);
        // unregister by position
        const { position } = ref;
        const pos = `${position.x},${position.y},${position.z}`;
        const posList = ThreeObjectRegistryByPos.get(pos);
        posList.splice(posList.indexOf(ref), 1);

        publish('threeObjects-list-changed', 'remove');
      },
      findThreeObject(id) {
        return ThreeObjectRegistry.get(id);
      },
      findThreeObjectByName(name) {
        return ThreeObjectRegistryByName.get(name);
      },
      findThreeObjectsByPos(x, y) {
        return ThreeObjectRegistryByPos.get(`${x},${y}`).filter((obj) => !obj.disabled) || [];
      },
      findThreeObjectsByLayer(type) {
        return ThreeObjectRegistryByType.get(type).filter((obj) => !obj.disabled) || [];
      },
      threeObjectNamesArray() {
        return Array.from(ThreeObjectRegistryByName.keys());
      },
    }),
    [
      ThreeObjectRegistry,
      ThreeObjectRegistryByType,
      ThreeObjectRegistryByName,
      ThreeObjectRegistryByPos,
      publish,
    ],
  );

  threeObjectsContextValue = useMemo(() => ({
    ThreeObjectRegistryByName,
    ...threeObjectsRegistryUtils,
  }), [
    ThreeObjectRegistryByName,
    threeObjectsRegistryUtils]);

  return (
    <ThreeObjectsContext.Provider value={threeObjectsContextValue}>
      {children}
    </ThreeObjectsContext.Provider>
  );
};

ThreeObjectsManager.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default ThreeObjectsManager;
