/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */

import React, { useRef, createElement, useMemo } from 'react';

import { useFrame } from '@react-three/fiber';

import * as THREE from 'three';

import ThreeObjectManager, { DefaultProps } from '../../../managers/ThreeObjectManager';

// Recursive function to convert THREE.js Object Scene to @react-three/fiber objects
// https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4
const RenderThreeChildren = ({
  props,
  geometries,
  materials,
  devices,
  generators,
  connections,
}) => {
  const childRef = useRef();

  const objProps = useMemo(() => {
    const threeObj = new THREE[props.type]();
    const propKeys = Object.keys(props).filter((prop) => threeObj[prop] !== undefined);
    const filteredProps = propKeys
      .filter((key) => propKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = props[key];
        return obj;
      }, {});
    const {
      layers,
      geometry, material,
      children,
      shadow,
      ...usedProps
    } = filteredProps;

    const params = threeObj.parameters;
    const args = params === undefined ? [] : Object.keys(params).map((param) => props[param]);

    return {
      ...usedProps,
      key: props.uuid,
      args,
      childRef,
      matrixAutoUpdate: false,
    };
  }, [props]);

  const geo = useMemo(() => geometries.filter((g) => g.uuid === props.geometry)[0],
    [props, geometries]);

  const geoProps = useMemo(() => {
    if (geo === undefined) return {};
    const threeObj = new THREE[geo.type]();

    const propKeys = Object.keys(geo).filter((prop) => threeObj[prop] !== undefined);
    const filteredProps = propKeys
      .filter((key) => propKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = geo[key];
        return obj;
      }, {});
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

  const mat = useMemo(() => materials.filter((m) => m.uuid === props.material)[0],
    [props, materials]);
  const matProps = useMemo(() => {
    if (mat === undefined) return {};
    const threeObj = new THREE[mat.type]();

    const propKeys = Object.keys(mat).filter((prop) => threeObj[prop] !== undefined);
    const filteredProps = propKeys
      .filter((key) => propKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = mat[key];
        return obj;
      }, {});
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
  const matGeoChildren = (props.geometry !== undefined && props.material !== undefined) ? [
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

  return (
    <ThreeObjectManager key={`rt_${props.uuid}`} {...DefaultProps} type={props.type} {...props}>
      {createElement(
        props.type,
        objProps,
        [
          ...matGeoChildren,
          props.children && props.children.length > 0
            ? props.children.map((childProps) => RenderThreeChildren(
              {
                props: childProps,
                geometries,
                materials,
                devices,
                generators,
                connections,
              },
            )) : null,
        ],
      )}
    </ThreeObjectManager>
  );
};

export default RenderThreeChildren;
