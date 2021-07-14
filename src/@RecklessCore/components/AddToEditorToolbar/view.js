import { memo, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import AddToEditorCloseButton from '../AddToEditorCloseButton/index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const AddToEditorToolbarView = (props, ref) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <AddToEditorCloseButton handleClose={props.handleClose} />
          <Typography>Add Component</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default memo(forwardRef(AddToEditorToolbarView));