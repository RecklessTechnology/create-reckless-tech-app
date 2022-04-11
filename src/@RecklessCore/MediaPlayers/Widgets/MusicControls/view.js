import PropTypes from 'prop-types';

import clsx from 'clsx';

import React, {
  memo,
  // useEffect, useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, CardMedia,
} from '@material-ui/core';

// import TrackList from './tracklist';

import PlaybackControls from '../../../Components/Controls/PlaybackControls';
import DisplayTextView from '../../../Components/Text/DisplayText/view';

import theme from '../../../../theme';

const useStyles = makeStyles(() => ({
  root: {
    pointerEvents: 'all',
    height: '100%',
    position: 'relative',
  },
  details: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  detailText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: '#FFFFFF',
  },
  content: {
    width: '100%',
    zIndex: 1,
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  glassBackground: {
    /* From https://css.glass */
    background: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(2px)',
  },
  cover: {
    clear: 'both',
    width: '100%',
    height: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    position: 'absolute',
  },
  controls: {
    width: '100%',
    zIndex: 1,
    bottom: 0,
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  playbackControls: {
  },
}));

/**
 *
 * @param {*} param0
 * @returns
 */
const MusicControlsView = ({
  isPlaying = false,
  track = {
    title: '',
    artist: '',
    album: '',
    image: '',
  },
  // tracks,
  playPause = () => {},
  nextTrack = () => {},
  prevTrack = () => {},
}) => {
  const classes = useStyles();
  const {
    title, artist, album,
    image,
  } = track;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        component="img"
        image={image}
        title={title}
      />
      <div className={classes.details}>
        <CardContent className={clsx(classes.content, classes.glassBackground)}>
          <DisplayTextView component="h5" variant="h5" className={classes.detailText}>
            {(title !== undefined) ? title : ''}
          </DisplayTextView>
          <DisplayTextView variant="subtitle1" className={classes.detailText}>
            {(artist !== undefined && album !== undefined) ? `${artist} - ${album}` : ''}
          </DisplayTextView>
        </CardContent>
        <div className={clsx(classes.controls, classes.glassBackground)}>
          <PlaybackControls
            className={classes.playbackControls}
            {...{
              isPlaying,
              playPause,
              nextTrack,
              prevTrack,
            }}
          />
        </div>
      </div>
    </Card>
  );
};

MusicControlsView.propTypes = {
  /**
   * Tracks curent play state.
  */
  isPlaying: PropTypes.bool.isRequired,
  track: PropTypes.shape({
    title: PropTypes.string,
    artist: PropTypes.string,
    album: PropTypes.string,
    audioSrc: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
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
};

export default memo(MusicControlsView);
