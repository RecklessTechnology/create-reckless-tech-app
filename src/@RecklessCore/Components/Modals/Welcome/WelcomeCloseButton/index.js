import PropTypes from 'prop-types';

import React from 'react';

import { makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../../Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  button: {},
}));

const WelcomeCloseButton = ({ handleClose }) => {
  // Local CSS classes
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Close',
        handeClick: () => {
          handleClose();
        },
      }}
      className={classes.button}
    >
      <CloseIcon fontSize="small" />
    </IconButtonView>
  );
};

WelcomeCloseButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

WelcomeCloseButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default WelcomeCloseButton;
