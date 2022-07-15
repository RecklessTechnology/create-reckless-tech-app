import PropTypes from 'prop-types';

import React, { memo } from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';

import { Chip } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  label: {},
}));

/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either
  printed beside the avatar or in a tooltip.
* */
const ChipView = ({
  className,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Chip
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={clsx(classes.label, className)}
    />
  );
};

ChipView.whyDidYouRender = (process.env.NODE_ENV === 'development');

ChipView.propTypes = {
  /**
    Override default style.
  */
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string.isRequired,
  /**
   * Color
   */
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
  ]),
  // eslint-disable-next-line react/require-default-props
  clickable: PropTypes.func,
  /**
    Disable chip.
  */
  // eslint-disable-next-line react/require-default-props
  disabled: PropTypes.bool,
  /**
   * Label Text
   */
  // eslint-disable-next-line react/require-default-props
  label: PropTypes.string.isRequired,
};

ChipView.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  className: '',
  color: 'default',
};

export default memo(ChipView);
