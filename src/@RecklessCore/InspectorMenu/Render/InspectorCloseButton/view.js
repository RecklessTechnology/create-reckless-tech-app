import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../../Components/Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  button: {},
}));

const InspectorCloseButtonView = ({ inspectorMenuOpen, setInspectorMenuOpen }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Close',
        handeClick: () => {
          setInspectorMenuOpen(!inspectorMenuOpen);
        },
      }}
      className={classes.button}
    >
      <CloseIcon fontSize="small" />
    </IconButtonView>
  );
};

InspectorCloseButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

InspectorCloseButtonView.propTypes = {
  inspectorMenuOpen: PropTypes.bool.isRequired,
  setInspectorMenuOpen: PropTypes.func.isRequired,
};

export default memo(InspectorCloseButtonView);
