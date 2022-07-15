import PropTypes from 'prop-types';

// import { useFrame } from '@react-three/fiber';
import React, {
  useRef,
  useMemo,
  // useEffect,
  forwardRef,
} from 'react';

import {
  // DynamicDrawUsage,
  BufferGeometry,
  BufferAttribute,
  // Group,
  // GreaterDepth,
  // BufferGeometry,
  // LineSegments,
  LineBasicMaterial,
  Matrix4,
  // Mesh,
  DoubleSide,
  CustomBlending,
  // BoxBufferGeometry,
  // modGeometry,
  MeshBasicMaterial,
  // SphereGeometry,
  Line3,
} from 'three';

import {
  // acceleratedRaycast, computeBoundsTree, disposeBoundsTree,
  SAH,
  MeshBVH,
} from 'three-mesh-bvh';

// eslint-disable-next-line react/prop-types
const SourceMesh = forwardRef(({ geometry, showSource, ...props }, ref) => {
  const srcMaterial = new MeshBasicMaterial({
    color: 0xff0000,
    side: DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    opacity: 0.15,
    blending: CustomBlending,
  });

  return (
    <mesh
      {...props}
      visible={showSource}
      ref={ref}
      geometry={geometry}
      material={srcMaterial}
    />
  );
});

const GeoSlice = ({
  // eslint-disable-next-line react/prop-types
  geometry: srcGeometry, modGeometry, modPosition,
  // eslint-disable-next-line react/prop-types
  showSource, showMod,
  ...props
}) => {
  const mesh1Ref = useRef();
  const mesh2Ref = useRef();

  const modGeo = useMemo(() => {
    const g = modGeometry;
    g.computeBoundsTree({ maxLeafTris: 3, strategy: SAH });
    return g;
  }, [modGeometry]);

  const sourceBvhMesh = useMemo(() => {
    srcGeometry.computeBoundsTree({ maxLeafTris: 1, strategy: SAH });
    return new MeshBVH(
      srcGeometry,
      { ...props, maxLeafTris: 3 },
    );
  }, [props, srcGeometry]);

  const modMaterial = new MeshBasicMaterial({
    color: 0x0000ff,
    side: DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    opacity: 0.15,
    blending: CustomBlending,
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
        renderOrder={1}
        geometry={intersectGeo}
        material={intersectMaterial}
      />
      <SourceMesh geometry={srcGeometry} showSource={showSource} />
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

GeoSlice.propTypes = {
  geometry: PropTypes.shape({
    computeBoundsTree: PropTypes.func,
  }).isRequired,
};

export default GeoSlice;
