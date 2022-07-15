/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import React, {
  memo,
  useEffect,
  useRef,
  useState,
  useMemo,
  // useCallback,
  // useEffect,
} from 'react';

// import { useThree } from '@react-three/fiber';

import {
  BackSide,
  Vector3,
  Plane,
  // Matrix4,
} from 'three';
import { generateUUID } from 'three/src/math/MathUtils';

const GeoSlice = ({
  geometry, material,
  clippingPlanes,
  ...props
// eslint-disable-next-line arrow-body-style
}) => {
  const groupRef = useRef();
  const objectRef = useRef();

  const clipPlanes = useMemo(
    // eslint-disable-next-line arrow-body-style
    // eslint-disable-next-line no-unused-vars
    () => clippingPlanes.map(({ normal: n, constant: c }) => new Plane(n, c)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clippingPlanes, objectRef, groupRef],
  );

  useEffect(
    () => {
      if (objectRef.current !== undefined) {
        const p1 = objectRef.current.material.clippingPlanes[0];
        p1.translate(groupRef.current.position);

        const p2 = objectRef.current.material.clippingPlanes[1];
        p2.translate(groupRef.current.position);
        // const { normal } = clippingPlanes[0];
        // const point = new Vector3();

        // // eslint-disable-next-line no-console
        // console.log(objectRef.current.getWorldPosition());

        // normal.applyQuaternion(objectRef.current.quaternion);
        // point.copy(objectRef.current);
        // // p1.applyMatrix4(objectRef.current.matrix);
        // p1.setFromNormalAndCoplanarPoint(normal, point);
        // p1.copy(clipPlanes[0]);
        // p1.applyMatrix4(objectRef.current.matrix);
        // p1.constant = clippingPlanes[0].normal.normalize().dot(objectRef.current.position);

        // const p2 = objectRef.current.material.clippingPlanes[1];
        // p2.copy(clipPlanes[1]);
        // p2.applyMatrix4(objectRef.current.matrix);
        // p2.constant -= p2.distanceToPoint(objectRef.current.position);
        // objectRef.current.material.clippingPlanes[1]
        //   .constant -= objectRef.current.material.clippingPlanes[1]
        //     .distanceToPoint(objectRef.current.position);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clippingPlanes, objectRef, groupRef],
  );

  // const { scene } = useThree();
  // useEffect(() => {
  //   if (objectRef.current !== undefined) {
  //     const p1 = objectRef.current.material.clippingPlanes[0];
  //     const transform = new Matrix4();
  //     const tmpMatrix = new Matrix4();

  //     objectRef.current.updateMatrix();
  //     transform.copy(objectRef.current.matrix);

  //     tmpMatrix.multiplyMatrices(transform, p1.matrix);
  //     // objectRef.current.matrix.copy(objectRef.current.parent.matrix).invert();

  //     p1.applyMatrix4(tmpMatrix);

  //     // const p2 = groupRef.current.material.clippingPlanes[1];
  //     // p2.applyMatrix4(groupRef.current.matrix);
  //   }
  // }, [clipPlanes, objectRef]);

  // const helpers = useMemo(() => {
  //   if (objectRef.current !== undefined) {
  //     return objectRef.current.material.clippingPlanes.map((plane, i) => (
  //       // eslint-disable-next-line react/no-array-index-key
  //       <planeHelper key={i} args={[plane, 2, 0xffffff]} />
  //     ));
  //   }
  //   return clipPlanes.map((plane, i) => (
  //     // eslint-disable-next-line react/no-array-index-key
  //     <planeHelper key={i} args={[plane, 2, 0xffffff]} />
  //   ));
  // }, [objectRef, clipPlanes]);

  return (
    <group
      ref={groupRef}
      {...props}
      // position={[2 - (Math.random() * 2), 2 - (Math.random() * 2), 2 - (Math.random() * 2)]}
    >
      {/* {helpers} */}
      {/* Outside */}
      <mesh ref={objectRef} castShadow receiveShadow geometry={geometry}>
        <meshStandardMaterial
          {...material}
          attach="material"
          roughness={1}
          metalness={0.1}
          clippingPlanes={clipPlanes}
          clipShadows
          // clipIntersection
        />
      </mesh>
      {/* Inside */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          {...material}
          attach="material"
          roughness={1}
          metalness={0.1}
          side={BackSide}
          clippingPlanes={clipPlanes}
          // clipIntersection
        />
      </mesh>
    </group>
  );
};

GeoSlice.propTypes = {
  clippingPlanes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  geometry: PropTypes.shape({}).isRequired,
  material: PropTypes.shape({}).isRequired,
};

const GeoSlicer = ({
  children,
  slices,
  sliceSize,
  showSource,
}) => {
  const [instance, setInstance] = useState();
  const mesh1Ref = useRef();

  const sliceHeight = (2 / (slices + 1));
  const sliceInstances = useRef([]);

  useEffect(() => {
    setInstance(mesh1Ref.current.children[0].clone());
    sliceInstances.current = [];
    sliceInstances.current.push({
      uuid: generateUUID(),
      clippingPlanes: [
        {
          normal: new Vector3(0, 1, 0),
          constant: -(1 - (0 * sliceHeight)) + (sliceHeight - (sliceSize / 2)),
        },
        {
          normal: new Vector3(0, -1, 0),
          constant: (1 - (0 * sliceHeight)),
        },
      ],
    });
    for (let i = 1; i < slices + 1; i += 1) {
      sliceInstances.current.push({
        uuid: generateUUID(),
        clippingPlanes: [
          {
            normal: new Vector3(0, 1, 0),
            constant: -(1 - (i * sliceHeight)) + (sliceHeight - (sliceSize / 2)),
          },
          {
            normal: new Vector3(0, -1, 0),
            constant: (1 - (i * sliceHeight)),
          },
        ],
      });
    }
  }, [mesh1Ref, sliceHeight, sliceInstances, sliceSize, slices]);

  return (
    <group>
      <group
        visible={showSource}
        ref={mesh1Ref}
      >
        {children}
      </group>
      <group>
        {sliceInstances.current.reverse().map((inst) => {
          const { clippingPlanes, uuid } = inst;
          return (
            <GeoSlice
              key={`geo-slice-${uuid}`}
              geometry={instance.geometry}
              material={instance.material}
              clippingPlanes={clippingPlanes}
              {...mesh1Ref.current.children[0].children[0]} // instance props
              // position={[
              //   idx * 0.01, // 2 - (Math.random() * 1),
              //   0, // 2 - (Math.random() * 1),
              //   0, // 2 - (Math.random() * 1),
              // ]}
            />
          );
        })}
      </group>
    </group>
  );
};

GeoSlicer.propTypes = {
  children: PropTypes.node.isRequired,
  slices: PropTypes.number.isRequired,
  sliceSize: PropTypes.number.isRequired,
  showSource: PropTypes.bool.isRequired,
};

export default memo(GeoSlicer);
