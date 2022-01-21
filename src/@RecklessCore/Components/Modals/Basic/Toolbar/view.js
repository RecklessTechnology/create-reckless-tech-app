import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import ModalCloseButton from '../CloseButton/index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    minHeight: 'auto !important',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
}));

const ModalToolbarView = ({ handleClose }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
        >
          <ModalCloseButton {...{ handleClose }} />
          <Typography variant="h6" className={classes.title}>
            Reckless Technology
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

ModalToolbarView.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default memo(ModalToolbarView);
