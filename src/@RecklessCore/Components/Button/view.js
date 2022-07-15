import PropTypes from 'prop-types';

import React, { memo } from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';

import { Button } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  button: {
    pointerEvents: 'all',
  },
}));

/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either
  printed beside the avatar or in a tooltip.
* */
const ButtonView = ({
  className,
  children,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={clsx(classes.button, className)}
    >
      {children}
    </Button>
  );
};

ButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

ButtonView.propTypes = {
  onClick: PropTypes.func.isRequired,
  /**
    Override default style.
  */
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string.isRequired,
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
  // eslint-disable-next-line react/default-props-match-prop-types
  className: '',
  color: 'primary',
  size: 'medium',
  variant: 'contained',
};

export default memo(ButtonView);
