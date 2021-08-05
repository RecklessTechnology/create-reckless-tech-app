/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Link, IconButton, Tooltip } from '@material-ui/core';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles(() => ({
  iconButton: {
    margin: '0px 27.66px',
  },
}));

const RoomOpenUrlButtonView = ({ url }) => {
  // Create local classes
  const classes = useStyles();

  return (
    <Link href={url} target="_blank" rel="noopener">
      <Tooltip title="Open URL" aria-label="Open URL">
        <IconButton className={classes.iconButton}>
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

RoomOpenUrlButtonView.whyDidYouRender = true;

RoomOpenUrlButtonView.propTypes = {
  url: PropTypes.string.isRequired,
};

export default memo(RoomOpenUrlButtonView);
