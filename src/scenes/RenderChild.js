import React, { useRef, createElement } from 'react';

import { useFrame } from '@react-three/fiber';

import * as THREE from 'three';

import RecklessObject, { DefaultProps } from '../@RecklessCore/RecklessObject';

function buildObjProps(props, ref) {
  const threeObj = new THREE[props.type]();
  const propKeys = Object.keys(props).filter(prop=>threeObj[prop] !== undefined);
  const filteredProps = propKeys
    .filter(key => propKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = props[key];
      return obj;
    }, {});
  const {
    layers,
    geometry, material,
    children,
    shadow,
    ...usedProps} = filteredProps;

  const params = threeObj.parameters;
  const args = params === undefined ? [] : Object.keys(params).map(param=>props[param]);

  return {
    ...usedProps,
    key: props.uuid,
    args,
    ref,
    matrixAutoUpdate: false,
  }
}

function buildGeoProps(props) {
  const threeObj = new THREE[props.type]();
  
  const propKeys = Object.keys(props).filter(prop=>threeObj[prop] !== undefined);
  const filteredProps = propKeys
    .filter(key => propKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = props[key];
      return obj;
    }, {});
  const {
    uuid, type,
    geometry, material,
    children,
    matrix,
    ...usedProps} = filteredProps;

  const params = threeObj.parameters;
  const args = params === undefined ? [] : Object.keys(params).map(param=>props[param]);

  args.push(usedProps);

  return {
    key: props.uuid,
    args
  }
}

function buildMatProps(props) {
  const threeObj = new THREE[props.type]();
  
  const propKeys = Object.keys(props).filter(prop=>threeObj[prop] !== undefined);
  const filteredProps = propKeys
    .filter(key => propKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = props[key];
      return obj;
    }, {});
  const {
    uuid, type,
    geometry, material,
    children,
    matrix,
    ...usedProps} = filteredProps;

  const params = threeObj.parameters;
  const args = params === undefined ? [] : Object.keys(params).map(param=>props[param]);

  args.push(usedProps);

  return {
    key: props.uuid,
    args
  }
}

// Recursive function to convert THREE.js Object Scene to @react-three/fiber objects
// https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4
export default function RenderChild({
  props,
  geometries,
  materials,
  inputs,
  generators,
  connections,
}) {
  const childRef = useRef();
  
  // Only need material and geometry for objects
  const matGeoChildren = (props.geometry !== undefined && props.material !== undefined) ? [
    ...geometries.filter((geo)=>geo.uuid===props.geometry).map((geoProps)=>createElement(geoProps.type, buildGeoProps(geoProps),[])),
    ...materials.filter((mat)=>mat.uuid===props.material).map((matProps)=>createElement(matProps.type, buildMatProps(matProps),[]))
  ] : [];

  // TODO: More robust way to handle uniform values
  useFrame((state, delta) => {
    if (childRef.current) {
      if (childRef.current.material) {
        if (childRef.current.material.uniforms) {
          if (childRef.current.material.uniforms.time) {
            childRef.current.material.uniforms.time.value = state.clock.elapsedTime;
          }
        }
      }
    }
  })

  return <RecklessObject key={`rt_${props.uuid}`} {...DefaultProps} type={props.type} {...props}>
      {createElement(
        props.type,
        buildObjProps(props, childRef),
        [
          ...matGeoChildren,
          props.children && props.children.length > 0 ? props.children.map((childProps)=>RenderChild(
            {
              props: childProps,
              geometries,
              materials,
              inputs,
              generators,
              connections,
            }
          )) : null
        ]
      )}
  </RecklessObject>
}