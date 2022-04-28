import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../../../Components/Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  button: {},
}));

const AddToSceneCloseButtonView = ({ handleClose }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Close',
        handleClick: (evt) => {
          handleClose(evt);
        },
      }}
      className={classes.button}
      disabled={false}
    >
      <CloseIcon fontSize="small" />
    </IconButtonView>
  );
};

AddToSceneCloseButtonView.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

AddToSceneCloseButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(AddToSceneCloseButtonView);
