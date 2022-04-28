/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

import React, { memo } from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';

import { Avatar, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

import DefaultProps from './DefaultProps.json';

export const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either
  printed beside the avatar or in a tooltip.
* */
const ButtonView = ({
  children,
  ...props
}) => {
  const classes = useStyles();
  return (
    // eslint-disable-next-line no-console
    <Button {...props}>{children}</Button>
  );
};

ButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

ButtonView.propTypes = {
  /**
   * Children
   */
  children: PropTypes.node.isRequired,
  /**
   * Color
   */
  color: PropTypes.oneOf([
    'primary',
    'secondary',
  ]),
  /**
   * Size
   */
  size: PropTypes.oneOf([
    'large',
    'medium',
    'small',
  ]),
  /**
   * Variant
   */
  variant: PropTypes.oneOf([
    'contained',
    'outlined',
    'text',
  ]),
  /**
   * Put Icon After Text
   */
  // eslint-disable-next-line react/require-default-props
  endIcon: PropTypes.node,
  /**
   * Color
   */
  // eslint-disable-next-line react/require-default-props
  fullWidth: PropTypes.bool,
  /**
   * Open Link
   */
  // eslint-disable-next-line react/require-default-props
  href: PropTypes.string,
  /**
   * Put Icon Before Text.
   */
  // eslint-disable-next-line react/require-default-props
  startIcon: PropTypes.node,
  /**
   * Disable button.
   */
  // eslint-disable-next-line react/require-default-props
  disabled: PropTypes.bool,
};

ButtonView.defaultProps = {
  color: 'primary',
  size: 'medium',
  variant: 'contained',
};

// eslint-disable-next-line no-console
console.log(ButtonView.defaultProps);

export default memo(ButtonView);
