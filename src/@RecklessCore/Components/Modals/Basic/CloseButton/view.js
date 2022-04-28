import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../../Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  button: {},
}));

const ModalCloseButtonView = ({ editorMenuOpen, setEditorMenuOpen }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Close',
        handleClick: () => {
          setEditorMenuOpen(!editorMenuOpen);
        },
      }}
      className={classes.button}
      disabled={false}
    >
      <CloseIcon fontSize="small" />
    </IconButtonView>
  );
};

ModalCloseButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

ModalCloseButtonView.propTypes = {
  editorMenuOpen: PropTypes.bool.isRequired,
  setEditorMenuOpen: PropTypes.func.isRequired,
};

export default memo(ModalCloseButtonView);
