import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import IconButtonView from '../../../../Components/IconButton/view';

const useStyles = makeStyles(() => ({
  button: {},
}));

const InspectorCloseButtonView = ({
  inspectorMenuOpen, setInspectorMenuOpen, fontSize, showLabel,
}) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Close',
        onClick: () => {
          setInspectorMenuOpen(!inspectorMenuOpen);
        },
      }}
      className={classes.button}
      disabled={false}
      showLabel={showLabel}
    >
      <ChevronRightIcon fontSize={fontSize} />
    </IconButtonView>
  );
};

InspectorCloseButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

InspectorCloseButtonView.propTypes = {
  inspectorMenuOpen: PropTypes.bool.isRequired,
  setInspectorMenuOpen: PropTypes.func.isRequired,
  showLabel: PropTypes.bool.isRequired,
  fontSize: PropTypes.string.isRequired,
};

export default memo(InspectorCloseButtonView);
