/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton, Tooltip } from '@material-ui/core';

import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles(() => ({
  iconButton: {
    margin: '0px 27.66px',
  },
}));

const RoomCopyUrlButtonView = ({ url }) => {
  // Create local classes
  const classes = useStyles();

  return (
    <Tooltip title="Copy URL">
      <IconButton
        className={classes.iconButton}
        onClick={() => {
          navigator.clipboard.writeText(url).then();
        }}
      >
        <FileCopyIcon />
      </IconButton>
    </Tooltip>
  );
};

RoomCopyUrlButtonView.whyDidYouRender = true;

RoomCopyUrlButtonView.propTypes = {
  url: PropTypes.string.isRequired,
};

export default memo(RoomCopyUrlButtonView);
