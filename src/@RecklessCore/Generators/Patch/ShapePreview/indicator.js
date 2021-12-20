import PropTypes from 'prop-types';

import React, {
  memo, useEffect, useState, useRef, useCallback,
} from 'react';

import { makeStyles } from '@material-ui/styles';
import useGeneratorsContext from '../../Contexts/useGeneratorsContext';
import useAppContext from '../../../App/Contexts/useAppContext';

const useStyles = makeStyles(() => ({
  canvasContainer: {
    width: (props) => (props.parentSize[0]),
    height: (props) => (props.parentSize[1]),
    position: 'absolute',
    zIndex: 2,
  },
  ind: {
    background: '#FFFFFF',
    borderRadius: '50%',
    border: '1px solid #222',
    width: 7,
    height: 7,
    position: 'absolute',
    left: (props) => (props.finalVal[0]),
    top: (props) => (props.finalVal[1]),

  },
}));

const ShapePreviewIndicator = ({
  shape, propName, parentSize, uuid,
}) => {
  const { subscribe, unsubscribe } = useAppContext();
  const { findGenerator } = useGeneratorsContext();
  const generatorObj = findGenerator(uuid);

  const [propVal, setPropVal] = useState(0);
  const [shapeDimensions, setShapeDimensions] = useState([-1, 1], [-1, 1]);
  const [finalVal, setFinalVal] = useState([1, 1]);

  const isMounted = useRef(false);

  const updateProp = useCallback((val) => {
    if (isMounted.current) {
      setPropVal(val);
    }
  }, [isMounted, setPropVal]);

  useEffect(() => {
    if (generatorObj !== undefined) {
      isMounted.current = true;
      setPropVal(generatorObj[propName]);
      subscribe(`${uuid}-${propName}-updated`, updateProp);
    }
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-${propName}-updated`, updateProp);
    };
  }, [subscribe, unsubscribe, generatorObj, propName, updateProp, uuid]);

  useEffect(() => {
    setShapeDimensions([
      [Math.min(...shape.map((p) => p[0])), Math.max(...shape.map((p) => p[0]))],
      [Math.min(...shape.map((p) => p[1])), Math.max(...shape.map((p) => p[1]))],
    ]);
  }, [shape, setShapeDimensions]);

  useEffect(() => {
    setFinalVal([
      (propVal[0] + shapeDimensions[0][1])
      * ((parentSize[0] * 0.9) / 2) + (parentSize[0] * 0.05) - 2.5,
      (-propVal[1] + shapeDimensions[1][1])
      * ((parentSize[1] * 0.9) / 2) + (parentSize[1] * 0.05) - 2, 5,
    ]);
  }, [propVal, shapeDimensions, parentSize]);

  // Create local classes
  const classes = useStyles({ parentSize, finalVal });
  return <div className={classes.canvasContainer}><div className={classes.ind} /></div>;
};

ShapePreviewIndicator.propTypes = {
  shape: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  parentSize: PropTypes.arrayOf(PropTypes.number).isRequired,
  propName: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default memo(ShapePreviewIndicator);
