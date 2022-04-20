import PropTypes from 'prop-types';

import clsx from 'clsx';

import React, {
  memo, useRef, useEffect, useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent,
} from '@material-ui/core';

import Canvas from '../../../Components/Canvas';

const useStyles = makeStyles(() => ({
  root: {
    pointerEvents: 'all',
    height: '100%',
    position: 'relative',
  },
  details: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  content: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  canvasOverride: {
    width: '100%',
    height: '100%',
  },
}));

const AudioVisualizerView = ({
  freqs = [],
}) => {
  const classes = useStyles();

  const [parentSize, setParentSize] = useState([0, 0]);
  const canvasRef = useRef();
  const parentRef = useRef();

  useEffect(() => {
    if (canvasRef.current !== undefined) {
      const context = canvasRef.current.getContext('2d');

      // context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.fillStyle = 'rgb(0, 0, 0)';
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      context.lineWidth = 2;
      context.strokeStyle = 'rgb(255, 255, 255)';

      context.beginPath();

      const sliceWidth = canvasRef.current.width / freqs.length;

      let x = 0;
      context.moveTo(x, (canvasRef.current.height - freqs[0]));
      for (let i = 1; i < freqs.length; i += 1) {
        const v = (freqs[i] / 256); // 0-255 scale
        const y = (
          canvasRef.current.height
          - (v * canvasRef.current.height)
        );

        context.lineTo(x, y);

        x += sliceWidth;
      }

      context.lineTo(canvasRef.current.width, canvasRef.current.height / 2);
      context.stroke();
    }
  }, [canvasRef, freqs]);

  useEffect(() => {
    setParentSize(
      parentRef.current
        ? [parentRef.current.offsetWidth, parentRef.current.offsetHeight] : [1, 1],
    );
  }, [parentRef, setParentSize]);

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={clsx(classes.content)} ref={parentRef}>
          <Canvas
            width={parentSize[0]}
            height={parentSize[1]}
            className={classes.canvasOverride}
            ref={canvasRef}
          />
        </CardContent>
      </div>
    </Card>
  );
};

AudioVisualizerView.propTypes = {
  freqs: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default memo(AudioVisualizerView);
