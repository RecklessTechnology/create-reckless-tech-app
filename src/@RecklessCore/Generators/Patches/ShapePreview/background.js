import PropTypes from 'prop-types';

import React, {
  memo, useRef, useEffect, useState,
} from 'react';

import { makeStyles } from '@material-ui/styles';

import CanvasView from '../../../Components/Canvas/view';

const useStyles = makeStyles(() => ({
  canvasContainer: {
    width: (props) => (props.parentSize[0]),
    height: (props) => (props.parentSize[1]),
    position: 'absolute',
    zIndex: 1,
  },
}));

const ShapePreviewBackground = ({ shape, parentSize }) => {
  const [shapeDimensions, setShapeDimensions] = useState([[-1, 1], [-1, 1]]);
  const [context, setContext] = useState(null);
  const canvasRef = useRef(null);
  const [finalShape, setFinalShape] = useState([[0, 0], [1, 1]]);

  useEffect(() => {
    // Save size of shape
    if (canvasRef.current !== undefined) {
      setShapeDimensions([
        [Math.min(...shape.map((p) => p[0])), Math.max(...shape.map((p) => p[0]))],
        [Math.min(...shape.map((p) => p[1])), Math.max(...shape.map((p) => p[1]))],
      ]);

      // Save canvas context
      setContext(canvasRef.current.getContext('2d'));
    }
  }, [canvasRef, shape, setShapeDimensions]);

  useEffect(() => {
    if (context !== null) {
      // adjust noralized generator values to size of dom container
      setFinalShape(shape.map((s) => [
        (s[0] + shapeDimensions[0][1]) * ((parentSize[0] * 0.9) / 2) + (parentSize[0] * 0.05),
        (-s[1] + shapeDimensions[1][1]) * ((parentSize[1] * 0.9) / 2) + (parentSize[1] * 0.05),
      ]));
    }
  }, [context, shape, shapeDimensions, parentSize]);

  useEffect(() => {
    if (context !== null) {
      // Draw shape on canvas
      const draw = (ctx) => {
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#222222';
        ctx.moveTo(finalShape[0][0], finalShape[0][1]);
        finalShape.forEach((s) => {
          ctx.lineTo(
            s[0],
            s[1],
          );
        });
        ctx.stroke();
      };

      draw(context);
    }
  }, [context, finalShape]);

  // Create local classes
  const classes = useStyles({ parentSize });
  return (
    <CanvasView
      width={parentSize[0]}
      height={parentSize[1]}
      className={classes.canvasContainer}
      ref={canvasRef}
    />
  );
};

ShapePreviewBackground.whyDidYouRender = (process.env.NODE_ENV === 'development');

ShapePreviewBackground.propTypes = {
  shape: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  parentSize: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default memo(ShapePreviewBackground);
