/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles, Link } from '@material-ui/core';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import IconButtonView from '../../IconButton/view';

const useStyles = makeStyles(() => ({
  iconButton: {
    margin: '0px 27.66px',
  },
}));

const RoomOpenUrlButtonView = ({ url }) => {
  const classes = useStyles();
  return (
    <Link href={url} target="_blank" rel="noopener">
      <IconButtonView
        {...{
          label: 'Open URL',
          handeClick: () => {
          },
        }}
        className={classes.iconButton}
      >
        <OpenInNewIcon fontSize="small" />
      </IconButtonView>
    </Link>
  );
};
RoomOpenUrlButtonView.whyDidYouRender = true;

RoomOpenUrlButtonView.propTypes = {
  url: PropTypes.string.isRequired,
};

export default memo(RoomOpenUrlButtonView);