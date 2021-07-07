import { useState, useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/styles';

import useGeneratorsContext from '../../../../contexts/useGeneratorsContext';

import DrawSine from '../../../../shapes/drawSine';
import DrawCircle from '../../../../shapes/drawCircle';

import ShapePreviewBackground from './background';
import ShapePreviewIndicator from './indicator';

const useStyles = makeStyles((theme) => ({
  shapeContainer: {
    width: '100%',
    height: 100,
  },
}));

const ShapePreview = ({ uuid, propName }) => {
  const { findGenerator } = useGeneratorsContext();
  const generatorObj = findGenerator(uuid);

  const [shape, setShape] = useState([0,0]);

  const shapeRef = useRef(null);
  const [ containerSize, setContainerSize ] = useState([1,1]);

  // Create local classes
  const classes = useStyles();

  useEffect(() => {
    setContainerSize(shapeRef.current ? [shapeRef.current.offsetWidth, shapeRef.current.offsetHeight] : [1,1]);
  }, [shapeRef, setContainerSize]);

  useEffect(()=>{
    if (generatorObj !== undefined) {
      switch(generatorObj.type) {
        default:
        case'Sinewave':
          setShape(DrawSine(generatorObj.resolution));
          break;
        case 'Orbit':
          setShape(DrawCircle(generatorObj.resolution));
          break;
      }
    }
  },[setShape, generatorObj]);

  if (generatorObj === undefined) { return null }

  return <div className={classes.shapeContainer} ref={shapeRef}>
    <ShapePreviewIndicator {...{ shape: shape, propName: propName, parentSize: containerSize, uuid: uuid }} />
    <ShapePreviewBackground {...{  shape: shape, parentSize: containerSize }} />
  </div>;
}

export default ShapePreview;