/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';

import React, {
  memo,
  useRef,
  useMemo,
  // useEffect,
} from 'react';

import {
  BufferGeometry,
  BufferAttribute,
  LineBasicMaterial,
  Matrix4,
  // DoubleSide,
  // CustomBlending,
  MeshBasicMaterial,
  Line3,
} from 'three';

import {
  SAH,
  MeshBVH,
} from 'three-mesh-bvh';

const ClippingEdge = ({
  children,
  // eslint-disable-next-line react/prop-types
  modGeometry, modPosition,
  // eslint-disable-next-line react/prop-types
  showSource, showMod,
  ...props
}) => {
  const mesh1Ref = useRef();
  const mesh2Ref = useRef();

  const sourceBvhMesh = useMemo(() => {
    if (mesh1Ref.current) {
      return new MeshBVH(
        mesh1Ref.current.children[0].geometry,
        { ...props, maxLeafTris: 64 },
      );
    }
    return false;
  }, [children, modGeometry]);

  const modGeo = useMemo(() => {
    const g = modGeometry;
    g.computeBoundsTree({ maxLeafTris: 3, strategy: SAH });
    return g;
  }, [modGeometry]);

  const modMaterial = new MeshBasicMaterial({
    color: 0x0000ff,
    // side: DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    opacity: 0.15,
    transparent: true,
    // blending: CustomBlending,
  });

  const intersectMaterial = new LineBasicMaterial({
    color: 0xffffff,
    linewidth: 1,
    linecap: 'round',
    linejoin: 'round',
  });

  const results = useMemo(() => {
    const edge = new Line3();
    const r = [];
    if (mesh1Ref.current && mesh2Ref.current) {
      const matrix2to1 = new Matrix4().copy(
        mesh1Ref.current.matrixWorld,
      ).invert().multiply(mesh2Ref.current.matrixWorld);
      sourceBvhMesh.bvhcast(mesh2Ref.current.geometry.boundsTree, matrix2to1, {
        intersectsTriangles(triangle1, triangle2) {
          if (triangle1.intersectsTriangle(triangle2, edge)) {
            const { start, end } = edge;
            r.push(
              start.x,
              start.y,
              start.z,
              end.x,
              end.y,
              end.z,
            );
          }
        },
      });
    }
    return r;
  }, [sourceBvhMesh]);

  const g = useMemo(() => new BufferGeometry(), []);
  // Update source geo if results list has changed
  const intersectGeo = useMemo(() => {
    const array = new Float32Array(results);
    g.setAttribute('position', new BufferAttribute(array, 3));
    return g;
  }, [results, g]);

  return (
    <group>
      <lineSegments
        geometry={intersectGeo}
        material={intersectMaterial}
      />
      <group
        visible={showSource}
        ref={mesh1Ref}
      >
        {children}
      </group>
      <mesh
        visible={showMod}
        position={modPosition}
        ref={mesh2Ref}
        geometry={modGeo}
        material={modMaterial}
      />
    </group>
  );
};

ClippingEdge.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(ClippingEdge);
