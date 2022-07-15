import PropTypes from 'prop-types';

import React, {
  memo, forwardRef, useEffect,
} from 'react';

/**
- Basic HTML Canvas
* */
const CanvasView = forwardRef(({
  className, width, height, backgroundColor,
}, ref) => {
  useEffect(() => {
    ref.current.getContext('2d').clearRect(0, 0, width, height);

    // eslint-disable-next-line no-param-reassign
    ref.current.getContext('2d').fillStyle = backgroundColor;
    ref.current.getContext('2d').fillRect(0, 0, width, height);
  });
  return (
    <canvas
      style={{
        pointerEvents: 'all',
      }}
      className={className}
      width={`${width}px`}
      height={`${height}px`}
      ref={ref}
    />
  );
});

CanvasView.propTypes = {
  /**
   * Override class
  */
  className: PropTypes.string,
  /**
   * Width of canvas
   */
  width: PropTypes.number,
  /**
   * Height of canvas
   */
  height: PropTypes.number,
  /**
   * Background color of canvas
   */
  backgroundColor: PropTypes.string,
};

CanvasView.defaultProps = {
  className: '',
  width: 100,
  height: 100,
  backgroundColor: 'rgba(0,0,0,0.5)',
};

export default memo(CanvasView);
