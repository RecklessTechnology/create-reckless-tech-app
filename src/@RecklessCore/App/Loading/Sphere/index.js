import PropTypes from 'prop-types';

import React, {
  useRef,
  useMemo,
  useEffect,
} from 'react';

import {
  BufferAttribute, DynamicDrawUsage,
  Vector3, Line3,
} from 'three';

import {
  MeshBVH,
} from 'three-mesh-bvh';

const LoadingSphere = ({
  geometry, plane, ...props
}) => {
  const lineSegRef = useRef();
  const geomRef = useRef();

  const bvhMesh = useMemo(() => {
    geometry.computeBoundsTree();
    return new MeshBVH(geometry, { ...props, maxLeafTris: 3 });
  }, [geometry, props]);

  useEffect(() => {
    if (geomRef.current) {
      const geo = geomRef.current;
      if (!geo.hasAttribute('position')) {
        const linePosAttr = new BufferAttribute(new Float32Array(9999), 3, false);
        linePosAttr.setUsage(DynamicDrawUsage);
        geo.setAttribute('position', linePosAttr);
      }
    }
  }, []);

  useEffect(() => {
    if (bvhMesh && geomRef.current && lineSegRef.current) {
      let index = 0;
      const tempVector = new Vector3();
      const tempLine = new Line3();
      const posAttr = geomRef.current.attributes.position;

      // code re-used and adjusted from https://gkjohnson.github.io/three-mesh-bvh/example/bundle/clippedEdges.html
      bvhMesh.shapecast({
        intersectsBounds: (box) => plane.intersectsBox(box),

        intersectsTriangle: (tri) => {
          // check each triangle edge to see if it intersects with the clippingPlane. If so then
          // add it to the list of segments.
          let count = 0;
          tempLine.start.copy(tri.a);
          tempLine.end.copy(tri.b);
          if (plane.intersectLine(tempLine, tempVector)) {
            posAttr.setXYZ(index, tempVector.x, tempVector.y, tempVector.z);
            index += 1;
            count += 1;
          }

          tempLine.start.copy(tri.b);
          tempLine.end.copy(tri.c);
          if (plane.intersectLine(tempLine, tempVector)) {
            posAttr.setXYZ(index, tempVector.x, tempVector.y, tempVector.z);
            count += 1;
            index += 1;
          }

          tempLine.start.copy(tri.c);
          tempLine.end.copy(tri.a);
          if (plane.intersectLine(tempLine, tempVector)) {
            posAttr.setXYZ(index, tempVector.x, tempVector.y, tempVector.z);
            count += 1;
            index += 1;
          }

          // If we only intersected with one or three sides then just remove it.
          // This could be handled more gracefully.
          if (count !== 2) {
            index -= count;
          }
        },
      });

      // set the draw range to only the new segments
      // and offset the lines so they don't intersect with the geometry
      geomRef.current.setDrawRange(0, index);
      posAttr.needsUpdate = true;
    }
  }, [bvhMesh, plane]);

  return (
    <lineSegments ref={lineSegRef} frustumCulled={false} matrixAutoUpdate={false} renderOrder={1}>
      <bufferGeometry ref={geomRef} attach="geometry" />
      <lineBasicMaterial
        attach="material"
        // neon yellow
        color="#ccff15"
        linewidth={1}
        linecap="round"
        linejoin="round"
        // battle the xxx
        // polygonOffset
        // polygonOffsetFactor={-1.0}
        // polygonOffsetUnits={4.0}
        // depthTest={false}
      />
    </lineSegments>
  );
};

LoadingSphere.propTypes = {
  geometry: PropTypes.shape({
    computeBoundsTree: PropTypes.func,
  }).isRequired,
  plane: PropTypes.shape({
    constant: PropTypes.number,
    intersectsBox: PropTypes.func,
    intersectLine: PropTypes.func,
  }).isRequired,
};

export default LoadingSphere;
