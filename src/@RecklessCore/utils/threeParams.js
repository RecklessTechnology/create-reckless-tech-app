import * as THREE from 'three';

// Finds the values needed for @react-three/fiber's props
const ThreeUsedProps = (props) => {
  const threeObj = new THREE[props.type]();
  const propKeys = Object.keys(props).filter(prop=>threeObj[prop] !== undefined);
  const filteredProps = propKeys
    .filter(key => propKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = props[key];
      return obj;
  }, {});
  return filteredProps;
}

// Finds the values needed for @react-three/fiber's args array
const ThreeParamsToArgs = (props) => {
  const threeObj = new THREE[props.type]();
  const propKeys = Object.keys(props).filter(prop=>threeObj[prop] !== undefined);
  const filteredProps = propKeys
    .filter(key => propKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = props[key];
      return obj;
  }, {});

  const params = threeObj.parameters !== undefined ? threeObj.parameters : filteredProps;
  const args = params === undefined ? [] : Object.keys(params).map(param=>{
    if (param === 'color') return `#${new THREE.Color(props[param]).getHexString()}`
    return props[param]
  })

  return args;
}

export {
  ThreeUsedProps,
  ThreeParamsToArgs
}