import { useMemo } from 'react';
import * as THREE from 'three';

// Finds the values needed for @react-three/fiber's props
const ThreeUsedProps = (props) => {
  const propKeys = useMemo(
    () => Object.keys(props).filter((prop) => new THREE[props.type]()[prop] !== undefined),
    [props],
  );
  const filteredProps = useMemo(() => propKeys
    .filter((key) => propKeys.includes(key))
    .reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = props[key];
      return obj;
    }, {}), [propKeys, props]);
  return filteredProps;
};

// Finds the values needed for @react-three/fiber's args array
const ThreeParamsToArgs = (props) => {
  const filteredProps = ThreeUsedProps(props);

  const params = useMemo(
    () => (new THREE[props.type]().parameters !== undefined
      ? new THREE[props.type]().parameters : filteredProps),
    [props, filteredProps],
  );
  const args = useMemo(() => (params === undefined ? [] : Object.keys(params).map((param) => {
    if (param === 'color') return `#${new THREE.Color(props[param]).getHexString()}`;
    return props[param];
  })), [props, params]);

  return args;
};

export {
  ThreeUsedProps,
  ThreeParamsToArgs,
};
