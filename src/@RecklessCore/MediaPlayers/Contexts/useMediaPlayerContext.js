import { useContext } from 'react';
import { MediaPlayerContext } from '../Managers/MediaPlayerManager';

export default function useMediaPlayerContext() {
  return useContext(MediaPlayerContext);
}
