/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import {
  memo, forwardRef,
} from 'react';

const DataGridView = (props, ref) => {
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

DataGridView.propTypes = {
  nGridCols: PropTypes.number.isRequired,
  nGridRows: PropTypes.number.isRequired,
  cubeSideLength: PropTypes.number.isRequired,
};

export default memo(forwardRef(DataGridView));
