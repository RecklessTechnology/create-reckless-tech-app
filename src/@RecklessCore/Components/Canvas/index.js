/* eslint-disable react/prop-types */
import React, {
  memo, forwardRef,
} from 'react';

const Canvas = forwardRef(({ className, width, height }, ref) => (
  <canvas
    style={{
      pointerEvents: 'all',
    }}
    className={className}
    width={`${width}px`}
    height={`${height}px`}
    ref={ref}
  />
));

Canvas.propTypes = {
};

export default memo(Canvas);
