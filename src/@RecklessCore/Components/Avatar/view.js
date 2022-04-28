/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

import React, { memo } from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';

import { Avatar } from '@material-ui/core';
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

const AvatarView = ({
  loading, username, src, size, ...props
}) => {
  const classes = useStyles();
  return (
    <Avatar
      className={clsx({
        [classes.small]: size === 'small',
        [classes.medium]: size === 'medium',
        [classes.large]: size === 'large',
      })}
      alt={username}
      src={src}
      {...props}
    >
      {(!src && loading) ? <PersonIcon fontSize={size} /> : username.substring(0, 2)}
    </Avatar>
  );
};

AvatarView.whyDidYouRender = (process.env.NODE_ENV === 'development');

AvatarView.propTypes = {
  loading: PropTypes.bool,
  username: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
  variant: PropTypes.oneOf([
    'circular',
    'rounded',
    'square',
  ]),
};

AvatarView.defaultProps = DefaultProps;

export default memo(AvatarView);
