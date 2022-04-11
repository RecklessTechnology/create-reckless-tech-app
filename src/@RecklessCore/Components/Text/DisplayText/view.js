/* eslint-disable react/require-default-props */
import PropTypes, { node } from 'prop-types';
import clsx from 'clsx';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import { Typography } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  textShadow: {
    textShadow: '3px 3px 5px rgba(0,0,0,0.6)',
  },
}));

/**
* Display Title Text with Drop Shadow.
*/
const DisplayTextView = ({
  children = node,
  className = '',
  variant = 'h1',
  component = 'h5',
  color = 'primary',
}) => {
  const classes = useStyles();
  return (
    <Typography
      color={color}
      component={component}
      variant={variant}
      className={clsx(
        className,
        classes.textShadow,
      )}
    >
      {children}
    </Typography>
  );
};

DisplayTextView.whyDidYouRender = (process.env.NODE_ENV === 'development');

DisplayTextView.propTypes = {
  /**
    Text to display.
  */
  children: PropTypes.node,
  /**
    Override default style.
  */
  className: PropTypes.string,
  /**
    Typography variant. i.e. h2, h3
  */
  variant: PropTypes.string,
  /**
    Typography component. i.e. p, span
  */
  component: PropTypes.string,
  /**
    Material UI Color. i.e. primaryText, secondary
  */
  color: PropTypes.string,
};

export default memo(DisplayTextView);
