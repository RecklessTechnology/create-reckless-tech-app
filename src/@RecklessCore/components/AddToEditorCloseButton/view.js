/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import { IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const AddToEditorCloseButtonView = ({ handleClose }) => {
  const classes = useStyles();
  return (
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  );
};

AddToEditorCloseButtonView.whyDidYouRender = true;

export default memo(AddToEditorCloseButtonView);
