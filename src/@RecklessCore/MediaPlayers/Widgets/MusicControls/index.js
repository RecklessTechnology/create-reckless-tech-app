/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';

import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';
import useMediaPlayersContext from '../../Contexts/useMediaPlayersContext';

import WidgetChrome from '../../../Widgets/Components/WidgetChrome';
import MusicControlsView from './view';
import useWidgetsContext from '../../../Widgets/Contexts/useWidgetsContext';

const MusicControls = ({
  connection,
  uuid,
  ...props
}) => {
  const { subscribe, unsubscribe } = useAppContext();
  const { findMediaPlayer } = useMediaPlayersContext();
  const { findWidget } = useWidgetsContext();

  const isMounted = useRef(false);

  const { from } = connection;
  const mediaPlayerObj = findMediaPlayer(from);
  const widgetObj = findWidget(uuid);

  const [mediaPlayer, setMediaPlayer] = useState();
  const [widget, setWidget] = useState();

  const [windowSize, setWindowSize] = useState(1);
  const [windowLocation, setWindowLocation] = useState(0);
  const [audio, setAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [track, setTrack] = useState({});
  const [tracks, setTracks] = useState([]);

  const updateProp = useCallback((val, prop) => {
    if (isMounted.current) {
      switch (prop.toLowerCase()) {
        default:
          break;
        case 'size':
          setWindowSize(val);
          break;
        case 'location':
          setWindowLocation(val);
          break;
        case 'audio':
          setAudio(val);
          break;
        case 'isplaying':
          setIsPlaying(val);
          break;
        case 'trackprogress':
          setTrackProgress(val);
          break;
        case 'trackindex':
          setTrackIndex(val);
          break;
        case 'tracks':
          setTracks(val);
          break;
      }
    }
  }, [isMounted]);

  useEffect(() => {
    isMounted.current = true;
    subscribe(`${uuid}-location-updated`, (val) => updateProp(val, 'location'));
    subscribe(`${uuid}-size-updated`, (val) => updateProp(val, 'size'));
    subscribe(`${from}-audio-updated`, (val) => updateProp(val, 'audio'));
    subscribe(`${from}-isplaying-updated`, (val) => updateProp(val, 'isPlaying'));
    subscribe(`${from}-trackprogress-updated`, (val) => updateProp(val, 'trackProgress'));
    subscribe(`${from}-trackindex-updated`, (val) => updateProp(val, 'trackIndex'));
    subscribe(`${from}-tracks-updated`, (val) => updateProp(val, 'tracks'));
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-location-updated`, (val) => updateProp(val, 'location'));
      unsubscribe(`${uuid}-size-updated`, (val) => updateProp(val, 'size'));
      unsubscribe(`${from}-audio-updated`, (val) => updateProp(val, 'audio'));
      unsubscribe(`${from}-isplaying-updated`, (val) => updateProp(val, 'isPlaying'));
      unsubscribe(`${from}-trackprogress-updated`, (val) => updateProp(val, 'trackProgress'));
      unsubscribe(`${from}-trackindex-updated`, (val) => updateProp(val, 'trackIndex'));
      unsubscribe(`${from}-tracks-updated`, (val) => updateProp(val, 'tracks'));
    };
  }, [from, subscribe, unsubscribe, updateProp, uuid]);

  useEffect(() => {
    if (tracks.length > 0) {
      setTrack(tracks[trackIndex]);
    }
  }, [track, trackIndex, tracks]);

  useEffect(() => {
    if (mediaPlayerObj !== undefined) {
      setMediaPlayer(mediaPlayerObj);
    }
    return () => {
    };
  }, [from, mediaPlayerObj]);

  useEffect(() => {
    if (widgetObj !== undefined) {
      setWidget(widgetObj);
    }
    return () => {
    };
  }, [uuid, mediaPlayerObj, widgetObj]);

  const changeSize = useCallback((val) => {
    if (widget !== undefined) {
      widget.setSize(val);
    }
  }, [widget]);

  const changeLocation = useCallback((val) => {
    if (widget !== undefined) {
      widget.setLocation(val);
    }
  }, [widget]);

  const playPause = useCallback(() => {
    if (mediaPlayer !== undefined) {
      mediaPlayer.setIsPlaying(!isPlaying);
      if (audio) {
        if (!isPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    }
  }, [audio, isPlaying, mediaPlayer]);

  const nextTrack = useCallback(() => {
    if (mediaPlayer !== undefined) {
      const trackChange = (trackIndex + 1);
      if (trackChange < tracks.length) {
        mediaPlayer.setTrackIndex(trackChange);
      } else {
        mediaPlayer.setTrackIndex(0);
      }
    }
  }, [mediaPlayer, trackIndex, tracks]);

  /**
   * hello
   */
  const prevTrack = useCallback(() => {
    if (mediaPlayer !== undefined) {
      const trackChange = (trackIndex - 1);
      if (trackChange > 1) {
        mediaPlayer.setTrackIndex(trackChange);
      } else {
        mediaPlayer.setTrackIndex(tracks.length - 1);
      }
    }
  }, [mediaPlayer, trackIndex, tracks]);

  if (widget === null || mediaPlayer === null) return null;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <WidgetChrome
      size={windowSize}
      changeSize={changeSize}
      location={windowLocation}
      changeLocation={changeLocation}
    >
      <MusicControlsView
        {...{
          trackIndex,
          isPlaying,
          trackProgress,
          track,
          tracks,
          playPause,
          prevTrack,
          nextTrack,
        }}
        {...props}
      />
    </WidgetChrome>
  );
};

MusicControls.propTypes = {
  uuid: PropTypes.string.isRequired,
  connection: PropTypes.shape({
    to: PropTypes.string,
    from: PropTypes.string,
  }).isRequired,
};

export default MusicControls;
