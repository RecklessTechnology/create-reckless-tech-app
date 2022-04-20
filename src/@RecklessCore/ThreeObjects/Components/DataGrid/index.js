import PropTypes from 'prop-types';
import {
  useEffect, useRef, useState,
} from 'react';
import { Lut } from 'three/examples/jsm/math/Lut';
import * as THREE from 'three';
import useAppContext from '../../../App/Contexts/useAppContext';

import DataGridView from './view';
// import { folder, useControls } from 'leva';

function getValueForNormalizedCoord(bars, normalizedCoord) {
  if (bars === undefined || !bars || bars.length === 0) {
    return 0;
  }
  // Interpolate from the bar values based on the normalized Coord
  const rawIdx = normalizedCoord * (bars.length - 1);
  const valueBelow = bars[Math.floor(rawIdx)];
  const valueAbove = bars[Math.ceil(rawIdx)];
  return valueBelow + (rawIdx % 1) * (valueAbove - valueBelow);
}

const DataGrid = ({ connections, uuid }) => {
  const amplitude = 3.0;
  const {
    subscribe, unsubscribe,
  } = useAppContext();

  const [freqs, setFreqs] = useState([]);

  // Inputs
  useEffect(() => {
    const updateFromInput = (prop, val) => {
      switch (prop.toLowerCase()) {
        default:
          // eslint-disable-next-line no-console
          console.log(`Unknown Prop Sent to DataGrid: ${prop}`);
          break;
        case 'freqs':
          setFreqs(val);
          break;
      }
    };

    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
    });

    return () => {
      connections.filter((c) => (c.to === uuid)).forEach((c) => {
        unsubscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
      });
    };
  }, [connections, uuid, subscribe, unsubscribe]);

  const nGridRows = 100;
  const nGridCols = 100;
  const cubeSideLength = 0.025;
  const cubeSpacingScalar = 5;

  const ref = useRef();

  useEffect(() => {
    const tempObj = new THREE.Object3D();
    const lut = new Lut('cooltowarm');
    // in ms
    const gridSizeX = nGridRows * cubeSpacingScalar * cubeSideLength;
    const gridSizeY = nGridCols * cubeSpacingScalar * cubeSideLength;
    const normQuadrantHypotenuse = Math.sqrt(
      (0.5 ** 2) + (0.5 ** 2),
    );
    let x; let y; let z; let idx; let normGridX; let normGridY; let
      normRadialOffset;

    for (let row = 0; row < nGridRows; row += 1) {
      for (let col = 0; col < nGridCols; col += 1) {
        idx = row * nGridCols + col;
        normGridX = row / nGridRows;
        normGridY = col / nGridCols;
        x = gridSizeX * (normGridX - 0.5);
        y = gridSizeY * (normGridY - 0.5);
        normRadialOffset = Math.sqrt(
          ((normGridX - 0.5) ** 2) + ((normGridY - 0.5) ** 2),
        ) / normQuadrantHypotenuse;

        z = amplitude * (0.0039 * getValueForNormalizedCoord(freqs, normRadialOffset));

        tempObj.position.set(x, y, z);
        tempObj.updateMatrix();
        ref.current.setMatrixAt(idx, tempObj.matrix);
        ref.current.setColorAt(idx, lut.getColor(normRadialOffset));
      }
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.instanceColor.needsUpdate = true;
  }, [freqs]);

  // eslint-disable-next-line react/react-in-jsx-scope
  return <DataGridView ref={ref} {...{ nGridCols, nGridRows, cubeSideLength }} />;
};

DataGrid.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  uuid: PropTypes.string.isRequired,
};

export default DataGrid;
