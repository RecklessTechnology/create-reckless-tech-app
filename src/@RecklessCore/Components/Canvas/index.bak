/* eslint-disable react/prop-types */
import React, {
  memo, createRef, useEffect,
} from 'react';

import PropTypes from 'prop-types';

const Canvas = ({ poses, dim }) => {
  const canvasRef = createRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const { width, height } = canvasRef.current.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      poses.forEach((p) => {
        p.keypoints.forEach((k) => {
          // { name, score, x, y }
          if (k.score > 0.75) {
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(
              (k.x / width) * dim[0],
              (k.y / height) * dim[1],
              5,
              5,
            );
          }
        });
      });
    }
  }, [canvasRef, dim, poses]);
  return (
    <canvas
      style={{
        border: '1px solid red',
        zIndex: 2,
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'all',
      }}
      width={`${dim[0]}px`}
      height={`${dim[1]}px`}
      ref={canvasRef}
    />
  );
};

Canvas.propTypes = {
  poses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default memo(Canvas);
