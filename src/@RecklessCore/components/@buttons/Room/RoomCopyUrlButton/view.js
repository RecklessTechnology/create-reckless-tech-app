/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import FileCopyIcon from '@material-ui/icons/FileCopy';

import IconButtonView from '../../IconButton/view';

const useStyles = makeStyles(() => ({
  iconButton: {
    margin: '0px 27.66px',
  },
}));

const RoomCopyUrlButtonView = ({ url }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Copy URL',
        handeClick: () => {
          navigator.clipboard.writeText(url).then();
        },
      }}
      className={classes.iconButton}
    >
      <FileCopyIcon fontSize="small" />
    </IconButtonView>
  );
};

RoomCopyUrlButtonView.whyDidYouRender = true;

RoomCopyUrlButtonView.propTypes = {
  url: PropTypes.string.isRequired,
};

export default memo(RoomCopyUrlButtonView);
