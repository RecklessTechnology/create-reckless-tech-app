/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import { IconButton, Tooltip } from '@material-ui/core';

import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  menuButton: {
    // marginRight: theme.spacing(2),
    padding: '10px',
  },
}));

const IconButtonView = ({
  children, label, handeClick, className, ...props
}) => {
  const classes = useStyles();
  return (
    <Tooltip title={label} aria-label={label}>
      <IconButton
        size="small"
        aria-label={label}
        onClick={handeClick}
        {...props}
        className={clsx(classes.menuButton, className)}
      >
        { children }
      </IconButton>
    </Tooltip>
  );
};

IconButtonView.whyDidYouRender = true;

IconButtonView.propTypes = {
  children: PropTypes.shape([]).isRequired,
  label: PropTypes.string.isRequired,
  handeClick: PropTypes.func.isRequired,
};

export default memo(IconButtonView);
