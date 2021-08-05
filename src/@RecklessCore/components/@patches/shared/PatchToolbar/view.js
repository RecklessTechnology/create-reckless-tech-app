/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar, ButtonGroup, Button, Tooltip,
} from '@material-ui/core';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    // necessary for content to be below app bar
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    overflow: 'hidden',
    minHeight: '32px',
  },
  toolbar: {
    padding: 0,
    minHeight: '32px',
  },
  appbar: {
    background: 'none',
  },
  group: {
    width: '100%',

  },
  button: {
    padding: '5px 16px',
    minWidth: '48px',
    borderRight: '1px solid rgba(255,255,255,0.05)',
  },
}));

// eslint-disable-next-line no-unused-vars
const PatchToolbarView = ({ parents, uuid, removeObj }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <ButtonGroup variant="text" aria-label="text primary button group" className={classes.group}>
            <Button className={classes.button} />
            <Button className={classes.button} />
            <Button
              className={classes.button}
              onClick={() => {
                removeObj(uuid);
              }}
            >
              <Tooltip title="Delete" aria-label="delete">
                <DeleteOutlineIcon fontSize="small" />
              </Tooltip>
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default memo(PatchToolbarView);
