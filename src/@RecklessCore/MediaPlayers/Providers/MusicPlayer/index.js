import { useRef, useEffect } from 'react';

import useMediaPlayerContext from '../../Contexts/useMediaPlayerContext';

const MusicPlayer = () => {
  const audioRef = useRef();

  const { getRef } = useMediaPlayerContext();
  const {
    tracks, trackIndex, setAudio, isPlaying,
  } = getRef();

  useEffect(() => {
    if (!audioRef.current) {
      // eslint-disable-next-line no-undef
      audioRef.current = new Audio(tracks[trackIndex].audioSrc);
    } else {
      audioRef.current.setAttribute('src', tracks[trackIndex].audioSrc);
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
    setAudio(audioRef.current);
  }, [isPlaying, setAudio, trackIndex, tracks]);

  return null;
};

MusicPlayer.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default MusicPlayer;
