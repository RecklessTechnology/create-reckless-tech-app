import PropTypes from 'prop-types';

import React, { memo } from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';

import { Select } from '@material-ui/core';

// import DefaultProps from './DefaultProps.json';
// import { People } from '@material-ui/icons';

export const useStyles = makeStyles(() => ({
  select: {
    pointerEvents: 'all',
  },
  fullWidth: {
    width: '100%',
  },
}));

/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either
  printed beside the avatar or in a tooltip.
* */
const SelectView = ({
  className,
  children,
  fullWidth,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Select
      className={clsx(
        classes.select,
        {
          [classes.fullWidth]: fullWidth,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Select>
  );
};

SelectView.whyDidYouRender = (process.env.NODE_ENV === 'development');

SelectView.propTypes = {
  onChange: PropTypes.func.isRequired,
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
   * Variant
   */
  variant: PropTypes.oneOf([
    'filled',
    'outlined',
    'standard',
  ]),
  /**
   * Replace Arrow Icon
   */
  // eslint-disable-next-line react/require-default-props
  IconComponent: PropTypes.node,
  /**
   * Force 100% width
   */
  // eslint-disable-next-line react/require-default-props
  fullWidth: PropTypes.bool,
  /**
   * Resize to match content width
   */
  // eslint-disable-next-line react/require-default-props
  autoWidth: PropTypes.bool,
  /**
   * Default Value
   */
  // eslint-disable-next-line react/require-default-props
  defaultValue: PropTypes.string,
  /**
   * Display Value even if empty.
   */
  // eslint-disable-next-line react/require-default-props
  displayEmpty: PropTypes.bool,
  /**
   * Disable Select.
   */
  // eslint-disable-next-line react/require-default-props
  disabled: PropTypes.bool,
};

SelectView.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  className: '',
  variant: 'standard',
};

export default memo(SelectView);
