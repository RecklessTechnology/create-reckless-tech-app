/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';

import {
  memo, useRef, useEffect,
} from 'react';

import { useMeasure, useWindowSize } from 'react-use';
import { useSpring, animated } from 'react-spring';

import { makeStyles, useTheme } from '@material-ui/styles';

import {
  Paper, Fade, Box,
} from '@material-ui/core';

import WidgetToolbar from '../Toolbars/WidgetToolbar';
// import darkTheme from '../../../Themes/dark';

const useStyles = makeStyles(() => ({
  widgetRoot: {
    zIndex: 500,
    margin: 0,
    padding: 0,
    position: 'absolute',
  },
  paper: {
    paddingBottom: 0,
    width: '100%',
    height: '100%',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    height: 50,
    flex: 1,
  },
}));

const WidgetChrome = ({
  size,
  changeSize,
  location,
  changeLocation,
  children,
}) => {
  const classes = useStyles();
  const isMounted = useRef();
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  const theme = useTheme();
  const [ref, { width, height }] = useMeasure();
  const { width: winWidth, height: winHeight } = useWindowSize();

  const getWidth = (s) => {
    switch (s) {
      default:
        // eslint-disable-next-line no-console
        console.log(`Widget Width Not Found: ${s}`);
        return '0px';
      case 0:
        return `${150}px`;
      case 1:
        return `${250}px`;
      case 2:
        return `${500}px`;
    }
  };

  const getHeight = (s) => {
    switch (s) {
      default:
        // eslint-disable-next-line no-console
        console.log(`Widget Height Not Found: ${s}`);
        return '0px';
      case 0:
        return `${50}px`;
      case 1:
        return `${250}px`;
      case 2:
        return `${500}px`;
    }
  };

  const widgetSpring = useSpring({
    config: { friction: 20 },
    top: (location === 0 || location === 1) // top left or top right
      ? theme.spacing(2)
      : winHeight - (height + theme.spacing(2)),
    left: (location === 0 || location === 3) // bottom left or bottom right
      ? theme.spacing(2)
      : winWidth - (width + theme.spacing(2)),
    width: getWidth(size),
    height: getHeight(size),
  });

  return (
    <Fade in={isMounted.current}>
      <Box p={1}>
        <animated.div
          ref={ref}
          style={{
            top: widgetSpring.top,
            left: widgetSpring.left,
          }}
          className={classes.widgetRoot}
        >
          <animated.div
            style={{
              width: widgetSpring.width,
              height: widgetSpring.height,
            }}
          >
            <Paper className={classes.paper}>
              { children }
            </Paper>
          </animated.div>
          <animated.div
            style={{
              width: widgetSpring.width,
            }}
          >
            <WidgetToolbar
              size={size}
              handleSizeChange={changeSize}
              location={location}
              handleLocationChange={changeLocation}
            />
          </animated.div>
        </animated.div>
      </Box>
    </Fade>
  );
};

WidgetChrome.propTypes = {
  size: PropTypes.number.isRequired,
  changeSize: PropTypes.func.isRequired,
  location: PropTypes.number.isRequired,
  changeLocation: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default memo(WidgetChrome);
