import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../../Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  button: {},
}));

const ModalCloseButton = ({ handleClose }) => {
  // Local CSS classes
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Close',
        handleClick: () => {
          handleClose();
        },
      }}
      className={classes.button}
      disabled={false}
    >
      <CloseIcon fontSize="small" />
    </IconButtonView>
  );
};

ModalCloseButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

ModalCloseButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default memo(ModalCloseButton);
