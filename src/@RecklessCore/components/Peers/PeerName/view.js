/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import { ListItemText } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  multiline: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

const PeerNameView = ({ primary, secondary }) => {
  const classes = useStyles();
  return (
    <ListItemText
      classes={{
        multiline: classes.multiline,
      }}
      primary={primary}
      secondary={secondary}
    />
  );
};

PeerNameView.whyDidYouRender = true;

PeerNameView.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
};

export default memo(PeerNameView);
