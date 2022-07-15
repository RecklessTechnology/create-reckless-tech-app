import PropTypes from 'prop-types';

import React, { memo } from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';

import { InputLabel } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  label: {
    textTransform: 'capitalize',
  },
}));

/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either
  printed beside the avatar or in a tooltip.
* */
const LabelView = ({
  className,
  children,
  ...props
}) => {
  const classes = useStyles();
  return (
    <InputLabel
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={clsx(classes.label, className)}
    >
      {children}
    </InputLabel>
  );
};

LabelView.whyDidYouRender = (process.env.NODE_ENV === 'development');

LabelView.propTypes = {
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
  // eslint-disable-next-line react/require-default-props
  error: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  margin: PropTypes.oneOf([
    false,
    'dense',
  ]),
  // eslint-disable-next-line react/require-default-props
  shrink: PropTypes.bool,
  /**
   * Variant
   */
  variant: PropTypes.oneOf([
    'filled',
    'outlined',
    'standard',
  ]),
  /**
   * Disable button.
   */
  // eslint-disable-next-line react/require-default-props
  disabled: PropTypes.bool,
};

LabelView.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  className: '',
  color: 'primary',
  variant: 'standard',
};

export default memo(LabelView);
