import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import { IconButton, Tooltip } from '@material-ui/core';

import clsx from 'clsx';

export const useStyles = makeStyles(() => ({
  menuButton: {
    // marginRight: theme.spacing(2),
    padding: '10px',
  },
}));

const IconButtonView = ({
  children, label, handeClick, className, disabled, ...props
}) => {
  const classes = useStyles();
  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          disabled={disabled}
          size="small"
          title={label}
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
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  handeClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default memo(IconButtonView);
