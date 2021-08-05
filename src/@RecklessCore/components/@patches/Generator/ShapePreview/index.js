/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';

import { makeStyles } from '@material-ui/styles';

import useGeneratorsContext from '../../../../contexts/useGeneratorsContext';

import DrawSine from '../../../../shapes/drawSine';
import DrawCircle from '../../../../shapes/drawCircle';

import ShapePreviewBackground from './background';
import ShapePreviewIndicator from './indicator';

const useStyles = makeStyles(() => ({
  shapeContainer: {
    width: '100%',
    height: 100,
    padding: '0 10%',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
}));

const ShapePreview = ({ uuid, propName }) => {
  const { findGenerator, getGeneratorsArray } = useGeneratorsContext();

  const [generator, setGenerator] = useState(null);

  const isMounted = useRef(false);

  const updateGenerator = useCallback((val) => {
    if (isMounted.current) {
      setGenerator(val);
    }
  }, [isMounted, setGenerator]);

  useEffect(() => {
    const generatorObj = findGenerator(uuid);
    if (generatorObj !== undefined) {
      isMounted.current = true;
      setGenerator(generatorObj);
      generatorObj.subscribe('generators-list-changed', updateGenerator);
    }
    return () => {
      isMounted.current = false;
    };
  }, [updateGenerator, findGenerator, uuid, getGeneratorsArray]);

  const [shape, setShape] = useState([[-1, -1], [1, 1], [1, -1], [-1, 1]]);

  const shapeRef = useRef(null);
  const [containerSize, setContainerSize] = useState([1, 1]);

  // Create local classes
  const classes = useStyles();

  useEffect(() => {
    setContainerSize(
      shapeRef.current
        ? [shapeRef.current.offsetWidth * 0.8, shapeRef.current.offsetHeight] : [1, 1],
    );
  }, [shapeRef, setContainerSize]);

  useEffect(() => {
    if (generator) {
      switch (generator.type) {
        default:
        case 'Sinewave':
          setShape(DrawSine(generator.resolution));
          break;
        case 'Orbit':
          setShape(DrawCircle(generator.resolution));
          break;
      }
    }
  }, [setShape, generator]);

  if (generator === null) {
    return (
      <div className={classes.shapeContainer} ref={shapeRef}>
        <ShapePreviewBackground {...{ shape, parentSize: containerSize }} />
      </div>
    );
  }

  return (
    <div className={classes.shapeContainer} ref={shapeRef}>
      <ShapePreviewIndicator {...{
        shape, propName, parentSize: containerSize, uuid,
      }}
      />
      <ShapePreviewBackground {...{ shape, parentSize: containerSize }} />
    </div>
  );
};

ShapePreview.propTypes = {
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};

export default ShapePreview;
