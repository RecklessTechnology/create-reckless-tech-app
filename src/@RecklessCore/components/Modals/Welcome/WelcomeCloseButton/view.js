import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../../Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  button: {},
}));

const EditorCloseButtonView = ({ editorMenuOpen, setEditorMenuOpen }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Close',
        handeClick: () => {
          setEditorMenuOpen(!editorMenuOpen);
        },
      }}
      className={classes.button}
    >
      <CloseIcon fontSize="small" />
    </IconButtonView>
  );
};

EditorCloseButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

EditorCloseButtonView.propTypes = {
  editorMenuOpen: PropTypes.bool.isRequired,
  setEditorMenuOpen: PropTypes.func.isRequired,
};

export default memo(EditorCloseButtonView);
