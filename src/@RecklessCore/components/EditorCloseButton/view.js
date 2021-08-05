/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import { IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const EditorCloseButtonView = ({ editorMenuOpen, setEditorMenuOpen }) => {
  const classes = useStyles();
  return (
    <IconButton
      edge="start"
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
      onClick={() => {
        setEditorMenuOpen(!editorMenuOpen);
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};

EditorCloseButtonView.whyDidYouRender = true;

EditorCloseButtonView.propTypes = {
  editorMenuOpen: PropTypes.bool.isRequired,
  setEditorMenuOpen: PropTypes.func.isRequired,
};

export default memo(EditorCloseButtonView);
