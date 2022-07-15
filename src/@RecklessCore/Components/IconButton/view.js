import PropTypes, { node } from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import { IconButton, Tooltip } from '@material-ui/core';

import clsx from 'clsx';

import Label from '../Label/view';

import Chip from '../Chip/view';

export const useStyles = makeStyles((theme) => ({
  menuButton: {
    // marginRight: theme.spacing(2),
    padding: theme.spacing(0),
    pointerEvents: 'all',
    width: 40,
    height: 40,
    display: 'inline-block',
  },
  span: {
    display: 'inline-flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tooltip: {
    background: 'none',
  },
  iconButtonLabel: {
    cursor: 'pointer',
  },
}));

/**
* Basic IconButton with Tooltip.
*/
const IconButtonView = ({
  children = node,
  label = 'default',
  showLabel = true,
  className = '',
  disabled = false,
  fontSize = 'small',
  // eslint-disable-next-line no-unused-vars
  onClick = (event) => {},
  ...props
}) => {
  const classes = useStyles();
  const button = (
    <div
      className={classes.span}
    >
      <IconButton
        onKeyPress={() => {}}
        onClick={(evt) => {
          if (!disabled) {
            onClick(evt);
          }
        }}
        aria-label={label}
        disabled={disabled}
        size={fontSize}
      // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        className={clsx(classes.menuButton, className)}
      >
        { children }
      </IconButton>
      {showLabel ? (
        <Label
          onKeyPress={() => {}}
          onClick={(evt) => {
            if (!disabled) {
              onClick(evt);
            }
          }}
          aria-label={label}
          fontSize={fontSize}
          className={classes.iconButtonLabel}
        >
          {label}
        </Label>
      ) : null}
    </div>
  );
  return !showLabel ? (
    <Tooltip
      classes={{
        tooltip: classes.tooltip,
      }}
      title={<Chip label={label} />}
    >
      {button}
    </Tooltip>
  ) : button;
};

IconButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

IconButtonView.propTypes = {
  /**
    Name of button. Tooltip or label text.
  */
  label: PropTypes.string.isRequired,
  /**
   * Show as label or tooltip.
   */
  // eslint-disable-next-line react/require-default-props
  showLabel: PropTypes.bool,
  /**
   * Font Size
   */
  // eslint-disable-next-line react/require-default-props
  fontSize: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
  /**
    Do something on click.
  */
  onClick: PropTypes.func.isRequired,
  /**
    Disable button.
  */
  disabled: PropTypes.bool.isRequired,
  /**
    Icon to display.
  */
  children: PropTypes.node.isRequired,
  /**
    Override default style.
  */
  className: PropTypes.string.isRequired,
};

export default memo(IconButtonView);
