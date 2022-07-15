/* eslint-disable react/react-in-jsx-scope */
import {
  memo, forwardRef,
} from 'react';

const DataGridView = (props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { nGridCols, nGridRows, cubeSideLength } = props;
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, nGridRows * nGridCols]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <boxGeometry
        attach="geometry"
        args={[cubeSideLength, cubeSideLength, cubeSideLength, 1]}
      />
      <meshBasicMaterial attach="material" color="white" toneMapped={false} />
    </instancedMesh>
  );
};

export default memo(forwardRef(DataGridView));
