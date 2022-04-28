import PropTypes from 'prop-types';

import clsx from 'clsx';

import React, {
  memo,
  // useEffect, useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import IconButtonView from '../../Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  root: {
  },
}));

const PlaybackControls = ({
  isPlaying = false,
  playPause = () => {},
  nextTrack = () => {},
  prevTrack = () => {},
  className = '',
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <IconButtonView
        {...{
          label: 'Previous Track',
          handleClick: prevTrack,
        }}
        className=""
        disabled={false}
      >
        <SkipPreviousIcon />
      </IconButtonView>
      <IconButtonView
        {...{
          label: 'Play / Pause',
          handleClick: playPause,
        }}
        className=""
        disabled={false}
      >
        {(isPlaying === true)
          ? <PauseIcon className={classes.playIcon} />
          : <PlayArrowIcon className={classes.playIcon} />}
      </IconButtonView>
      <IconButtonView
        {...{
          label: 'Next Track',
          handleClick: nextTrack,
        }}
        className=""
        disabled={false}
      >
        <SkipNextIcon />
      </IconButtonView>
    </div>
  );
};

PlaybackControls.propTypes = {
  /**
   * Current play state.
  */
  isPlaying: PropTypes.bool.isRequired,
  /**
    Flips isPlaying to opposite bool
    Triggers audio.play or audio.pause
  */
  playPause: PropTypes.func.isRequired,
  /**
    Name of button. Tooltip text.
  */
  prevTrack: PropTypes.func.isRequired,
  /**
    Name of button. Tooltip text.
  */
  nextTrack: PropTypes.func.isRequired,
  /**
    Override class.
   */
  className: PropTypes.string.isRequired,
};

export default memo(PlaybackControls);
