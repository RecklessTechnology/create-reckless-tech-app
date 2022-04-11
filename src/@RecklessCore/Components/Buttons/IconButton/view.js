import PropTypes, { node } from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import { IconButton, Tooltip } from '@material-ui/core';

import clsx from 'clsx';

export const useStyles = makeStyles(() => ({
  menuButton: {
    // marginRight: theme.spacing(2),
    padding: '10px',
    pointerEvents: 'all',
  },
}));

/**
* Basic IconButton with Tooltip.
*/
const IconButtonView = ({
  children = node,
  label = 'default',
  className = '',
  disabled = false,
  // eslint-disable-next-line no-unused-vars
  handeClick = (event) => {},
  ...props
}) => {
  const classes = useStyles();
  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          disabled={disabled}
          size="small"
          onClick={handeClick}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          className={clsx(classes.menuButton, className)}
        >
          { children }
        </IconButton>
      </span>
    </Tooltip>
  );
};

IconButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

IconButtonView.propTypes = {
  /**
    Name of button. Tooltip text.
  */
  label: PropTypes.string.isRequired,
  /**
    Do something on click.
  */
  handeClick: PropTypes.func.isRequired,
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
