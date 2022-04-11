import PropTypes from 'prop-types';

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  createContext,
} from 'react';

import useForceUpdate from '../../Utils/useForceUpdate';

import useMediaPlayersContext from '../Contexts/useMediaPlayersContext';
import useAppContext from '../../App/Contexts/useAppContext';
import DefaultTrackList from '../Providers/MusicPlayer/DefaultTrackList';

export const MediaPlayerContext = createContext(null);

// const DefaultTrack = {
//   title: '',
//   artist: '',
//   album: '',
//   audioSrc: '',
//   image: '',
// };

export const DefaultProps = {
  uuid: 'xxx',
  name: 'unnamed',
  type: '',
  isPlaying: false,
  trackProgress: 0,
  trackIndex: 0,
  tracks: DefaultTrackList,
  active: false,
  audio: null,
};

const MediaPlayerManager = ({
  children,
  uuid: passedUUID,
  name: passedName,
  type: passedType,

  audio: passedAudio,
  isPlaying: passedIsPlaying,
  trackProgress: passedTrackProgress,
  trackIndex: passedTrackIndex,
  tracks: passedTracks,

  active: passedActive,
}) => {
  const {
    sceneJSON, subscribe, unsubscribe, publish,
  } = useAppContext();
  const { connections } = sceneJSON;

  const identifier = useRef(Symbol('mediaPlayer'));
  const node = useRef(null);
  const audioRef = useRef(null);

  const [uuid] = useState(passedUUID || DefaultProps.uuid);
  const [name] = useState(passedName || DefaultProps.name);

  const [type, setType] = useState(passedType || DefaultProps.type);

  const [audio, setAudio] = useState(passedAudio || DefaultProps.audio);

  const [isPlaying, setIsPlaying] = useState(passedIsPlaying || DefaultProps.isPlaying);
  const [
    trackProgress, setTrackProgress,
  ] = useState(passedTrackProgress || DefaultProps.trackProgress);
  const [trackIndex, setTrackIndex] = useState(passedTrackIndex || DefaultProps.trackIndex);
  const [tracks, setTracks] = useState(
    passedTracks === undefined || passedTracks.length === 0
      ? DefaultProps.tracks
      : passedTracks,
  );

  const [active, setActive] = useState(passedActive || DefaultProps.active);

  // Inputs
  const updateFromInput = (prop, val) => {
    switch (prop.toLowerCase()) {
      default:
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
  };

  useEffect(() => {
    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
    });
    return () => {
      connections.filter((c) => (c.to === uuid)).forEach((c) => {
        unsubscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
      });
    };
  }, [connections, uuid, subscribe, unsubscribe]);

  // Outputs
  useEffect(() => { audioRef.current = audio; publish(`${uuid}-audio-updated`, audio); }, [uuid, audio, publish]);

  useEffect(() => { publish(`${uuid}-isplaying-updated`, isPlaying); }, [uuid, isPlaying, publish, audio]);
  useEffect(() => { publish(`${uuid}-trackprogress-updated`, trackProgress); }, [uuid, trackProgress, publish]);
  useEffect(() => { publish(`${uuid}-trackindex-updated`, trackIndex); }, [uuid, trackIndex, publish]);
  useEffect(() => { publish(`${uuid}-tracks-updated`, tracks); }, [uuid, tracks, publish]);

  useEffect(() => { publish(`${uuid}-active-updated`, active); }, [uuid, active, publish]);

  const { registerMediaPlayer, unregisterMediaPlayer } = useMediaPlayersContext();
  const forceUpdate = useForceUpdate();

  // Reference to object properties
  const mediaPlayerRef = useMemo(() => ({
    uuid,
    id: identifier.current,

    name,

    type,
    setType,

    active,
    setActive,

    audio,
    setAudio,
    isPlaying,
    setIsPlaying,
    trackProgress,
    setTrackProgress,
    trackIndex,
    setTrackIndex,
    tracks,
    setTracks,
  }), [
    uuid,
    name,
    type, setType,
    active, setActive,

    audio, setAudio,
    isPlaying, setIsPlaying,
    trackProgress, setTrackProgress,
    trackIndex, setTrackIndex,
    tracks, setTracks,
  ]);

  // Callback to fetch properties of object
  const getRef = useCallback(() => mediaPlayerRef, [mediaPlayerRef]);

  // On load, register object with app context
  useEffect(() => {
    registerMediaPlayer(uuid, mediaPlayerRef);
    return () => unregisterMediaPlayer(uuid, mediaPlayerRef);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Final context for provider
  const contextValue = useMemo(() => ({
    uuid,
    id: identifier.current,
    name,
    nodeRef: node,
    getRef,
    forceUpdate,
  }),
  [
    uuid,
    identifier,
    name,
    node,
    getRef,
    forceUpdate,
  ]);

  return (
    <MediaPlayerContext.Provider value={contextValue}>
      {children}
    </MediaPlayerContext.Provider>
  );
};

MediaPlayerManager.whyDidYouRender = (process.env.NODE_ENV === 'development');

MediaPlayerManager.propTypes = {
  children: PropTypes.node.isRequired,
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  audio: PropTypes.shape({
    play: PropTypes.func,
    pause: PropTypes.func,
  }),
  isPlaying: PropTypes.bool.isRequired,
  trackProgress: PropTypes.number.isRequired,
  trackIndex: PropTypes.number.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};

export default MediaPlayerManager;
