import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar, Grid, Button, Tooltip,
} from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RepeatIcon from '@material-ui/icons/Repeat';

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
    padding: 0,
    margin: 0,
    minWidth: 'auto',
  },
  buttonLoop: {
    padding: 0,
    margin: 0,
    minWidth: 'auto',
  },
  buttonLabel: {
    fontSize: 13,
  },
}));

// eslint-disable-next-line no-unused-vars
const PlaybackToolbarView = ({
  paused, setPause, looped, setLoop,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar
          variant="dense"
          className={classes.toolbar}
        >
          <Grid spacing={0} container>
            <Grid item xs={3}>
              <Button
                id="play-button"
                className={classes.button}
                onClick={() => {
                  setPause(!paused);
                }}
              >
                {(paused === true)
                  ? (
                    <Tooltip title="Play">
                      <PlayArrowIcon fontSize="small" />
                    </Tooltip>
                  )
                  : (
                    <Tooltip title="Pause">
                      <PauseIcon fontSize="small" />
                    </Tooltip>
                  )}
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                id="loop-button"
                className={classes.buttonLoop}
                onClick={() => {
                  setLoop(!looped);
                }}
              >
                {(looped === true)
                  ? (
                    <Tooltip title="No Loop">
                      <RepeatIcon fontSize="small" />
                    </Tooltip>
                  )
                  : (
                    <Tooltip title="Loop">
                      <RepeatIcon color="disabled" fontSize="small" />
                    </Tooltip>
                  )}
              </Button>
            </Grid>
            <Grid item xs={6} />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

PlaybackToolbarView.propTypes = {
  paused: PropTypes.bool.isRequired,
  setPause: PropTypes.func.isRequired,
  looped: PropTypes.bool.isRequired,
  setLoop: PropTypes.func.isRequired,
};

export default memo(PlaybackToolbarView);
