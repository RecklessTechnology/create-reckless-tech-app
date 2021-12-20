import PropTypes from 'prop-types';

import React, { useRef, createElement, useMemo } from 'react';

import { useFrame } from '@react-three/fiber';

import * as THREE from 'three';

import ThreeObjectManager, { DefaultProps } from '../Managers/ThreeObjectManager';

// Recursive function to convert THREE.js Object Scene to @react-three/fiber objects
// https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4
const RenderThreeChildren = ({
  props: passedProps,
  geometries,
  materials,
  devices,
  generators,
  connections,
}) => {
  const childRef = useRef();

  const objProps = useMemo(() => {
    const threeObj = new THREE[passedProps.type]();
    const propKeys = Object.keys(passedProps).filter((prop) => threeObj[prop] !== undefined);
    const filteredProps = propKeys
      .filter((key) => propKeys.includes(key))
      .reduce((obj, key) => ({
        ...obj,
        [key]: passedProps[key],
      }), {});
    const {
      layers,
      geometry, material,
      children,
      shadow,
      ...usedProps
    } = filteredProps;

    const params = threeObj.parameters;
    const args = params === undefined ? [] : Object.keys(params).map((param) => passedProps[param]);

    return {
      userData: {
        isPatchHidden: false,
      },
      ...usedProps,
      key: passedProps.uuid,
      args,
      childRef,
      matrixAutoUpdate: false,
    };
  }, [passedProps]);

  const geo = useMemo(() => geometries.filter((g) => g.uuid === passedProps.geometry)[0],
    [passedProps, geometries]);

  const geoProps = useMemo(() => {
    if (geo === undefined) return {};
    const threeObj = new THREE[geo.type]();

    const propKeys = Object.keys(geo).filter((prop) => threeObj[prop] !== undefined);
    const filteredProps = propKeys
      .filter((key) => propKeys.includes(key))
      .reduce((obj, key) => ({
        ...obj,
        [key]: geo[key],
      }), {});
    const {
      uuid, type,
      geometry, material,
      children,
      matrix,
      ...usedProps
    } = filteredProps;

    const params = threeObj.parameters;
    const args = params === undefined ? [] : Object.keys(params).map((param) => geo[param]);

    args.push(usedProps);

    return {
      key: geo.uuid,
      args,
    };
  }, [geo]);

  const mat = useMemo(() => materials.filter((m) => m.uuid === passedProps.material)[0],
    [passedProps, materials]);
  const matProps = useMemo(() => {
    if (mat === undefined) return {};
    const threeObj = new THREE[mat.type]();

    const propKeys = Object.keys(mat).filter((prop) => threeObj[prop] !== undefined);
    const filteredProps = propKeys
      .filter((key) => propKeys.includes(key))
      .reduce((obj, key) => ({
        ...obj,
        [key]: mat[key],
      }), {});
    const {
      uuid, type,
      geometry, material,
      children,
      matrix,
      ...usedProps
    } = filteredProps;

    const params = threeObj.parameters;
    const args = params === undefined ? [] : Object.keys(params).map((param) => mat[param]);

    args.push(usedProps);

    return {
      key: mat.uuid,
      args,
    };
  }, [mat]);

  // Only need material and geometry for objects
  const matGeoChildren = (passedProps.geometry !== undefined
    && passedProps.material !== undefined) ? [
      createElement(geo.type, geoProps, []),
      createElement(mat.type, matProps, []),
    ] : [];

  // TODO: More robust way to handle uniform values
  useFrame((state) => {
    if (childRef.current) {
      if (childRef.current.material) {
        if (childRef.current.material.uniforms) {
          if (childRef.current.material.uniforms.time) {
            childRef.current.material.uniforms.time.value = state.clock.elapsedTime;
          }
        }
      }
    }
  });

  let objChildren = [];

  if (passedProps.children && passedProps.children.length > 0) {
    objChildren = passedProps.children.map((childProps) => (
      <RenderThreeChildren
        {...{
          key: childProps.uuid,
          props: childProps,
          geometries,
          materials,
          devices,
          generators,
          connections,
        }}
      />
    ));
  }

  return (
    <ThreeObjectManager key={`rt_${passedProps.uuid}`} {...DefaultProps} type={passedProps.type} {...passedProps}>
      {createElement(
        passedProps.type,
        objProps,
        [
          ...matGeoChildren,
          ...objChildren,
        ],
      )}
    </ThreeObjectManager>
  );
};

RenderThreeChildren.whyDidYouRender = (process.env.NODE_ENV === 'development');

RenderThreeChildren.propTypes = {
  props: PropTypes.shape({
    type: PropTypes.string,
    uuid: PropTypes.string,
  }).isRequired,
  geometries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  materials: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  devices: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  generators: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  connections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default RenderThreeChildren;
