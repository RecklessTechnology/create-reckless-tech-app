import { useContext } from 'react';
import { MediaPlayersContext } from '../Managers/MediaPlayersManager';

export default function useMediaPlayersContext() {
  return useContext(MediaPlayersContext);
}
