import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
  memo,
} from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  ListItem, Grid,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useGeneratorsContext from '../../Contexts/useGeneratorsContext';

import DrawSine from '../../../Shapes/drawSine';
import DrawCircle from '../../../Shapes/drawCircle';

import ShapePreviewBackground from './background';
import ShapePreviewIndicator from './indicator';

import PropAccordianView from '../../../Components/Patches/PropAccordian/view';
import PlaybackToolbar from '../PlaybackToolbar';
import useAppContext from '../../../App/Contexts/useAppContext';

const useStyles = makeStyles(() => ({
  shapeContainer: {
    width: '100%',
    height: 100,
    padding: '0 10%',
  },
  propItem: {
    margin: 0,
    padding: 0,
    oveflow: 'hidden',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  propGrid: {
    width: '100%',
    height: '100%',
  },
  handleGridLeft: {
    padding: 0,
    paddingLeft: 9,
    paddingTop: 15,
  },
  handleGridRight: {
    padding: 0,
    paddingRight: 9,
    paddingTop: 15,
  },
}));

const ShapePreview = ({ uuid, propName }) => {
  const { subscribe, unsubscribe } = useAppContext();
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
      subscribe('generators-list-changed', updateGenerator);
    }
    return () => {
      isMounted.current = false;
      unsubscribe('generators-list-changed', updateGenerator);
    };
  }, [subscribe, unsubscribe, updateGenerator, findGenerator, uuid, getGeneratorsArray]);

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
      switch (generator.type.toLowerCase()) {
        default:
          // eslint-disable-next-line no-console
          console.log(`Unknown shape: ${generator.type}`);
          break;
        case 'sinewave':
          setShape(DrawSine(generator.resolution));
          break;
        case 'orbit':
          setShape(DrawCircle(generator.resolution));
          break;
      }
    }
  }, [setShape, generator]);

  const getPreview = (s, size) => {
    if (generator === null) {
      return (
        <div className={classes.shapeContainer} ref={shapeRef}>
          <ShapePreviewBackground {...{ shape: s, parentSize: size }} />
        </div>
      );
    }
    return (
      <div className={classes.shapeContainer} ref={shapeRef}>
        <ShapePreviewIndicator {...{
          shape: s, setGenerator, propName, parentSize: size, uuid,
        }}
        />
        <ShapePreviewBackground {...{ shape: s, parentSize: size }} />
      </div>
    );
  };

  return (
    <ListItem dense className={classes.propItem}>
      <Grid spacing={0} container className={classes.propGrid}>
        <Grid item xs={1} className={classes.handleGridLeft} />
        <Grid item xs={10}>
          <PropAccordianView
            defaultOpen
            header={<PlaybackToolbar uuid={uuid} />}
            expandIcon={(
              <ExpandMoreIcon fontSize="small" />
            )}
          >
            { getPreview(shape, containerSize) }
          </PropAccordianView>
        </Grid>
        <Grid item xs={1} className={classes.handleGridRight} />
      </Grid>
    </ListItem>
  );
};

ShapePreview.propTypes = {
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};

export default memo(ShapePreview);
