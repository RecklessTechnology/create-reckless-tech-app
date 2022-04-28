/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';

import {
  memo, useRef, useEffect,
} from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper, Fade,
} from '@material-ui/core';

import { useSpring, animated } from 'react-spring';

import WidgetToolbar from '../Toolbars/WidgetToolbar';
import darkTheme from '../../../Themes/dark';

const useStyles = makeStyles(() => ({
  root: {
    zIndex: 500,
    margin: 0,
    padding: 0,
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
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

  const positionSpring = useSpring({
    config: { friction: 10 },
    top: (location === 0 || location === 1) ? darkTheme.spacing(4) : 'auto',
    right: (location === 1 || location === 2) ? darkTheme.spacing(4) : 'auto',
    bottom: (location === 2 || location === 3) ? darkTheme.spacing(4) : 'auto',
    left: (location === 3 || location === 0) ? darkTheme.spacing(4) : 'auto',
  });

  const widgetSizeSpring = useSpring({
    config: { friction: 10 },
    width: getWidth(size),
    height: getHeight(size),
  });

  const widgetWidthSpring = useSpring({
    config: { friction: 10 },
    width: getWidth(size),
  });
  return (
    <Fade in={isMounted.current}>
      <animated.div
        style={positionSpring}
        className={classes.root}
      >
        <animated.div
          style={widgetSizeSpring}
        >
          <Paper className={classes.paper}>
            { children }
          </Paper>
        </animated.div>
        <animated.div
          style={widgetWidthSpring}
        >
          <WidgetToolbar
            size={size}
            handleSizeChange={changeSize}
            location={location}
            handleLocationChange={changeLocation}
          />
        </animated.div>
      </animated.div>
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
