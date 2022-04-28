import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import IconButtonView from '../../../../Components/Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  button: {},
}));

const InspectorCloseButtonView = ({ inspectorMenuOpen, setInspectorMenuOpen }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Close',
        handleClick: () => {
          setInspectorMenuOpen(!inspectorMenuOpen);
        },
      }}
      className={classes.button}
      disabled={false}
    >
      <ChevronRightIcon fontSize="small" />
    </IconButtonView>
  );
};

InspectorCloseButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

InspectorCloseButtonView.propTypes = {
  inspectorMenuOpen: PropTypes.bool.isRequired,
  setInspectorMenuOpen: PropTypes.func.isRequired,
};

export default memo(InspectorCloseButtonView);
