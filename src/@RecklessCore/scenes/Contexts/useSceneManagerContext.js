import { useContext } from 'react';

import { SceneManagerContext } from '../Managers/SceneManager';

export default function useSceneManager() {
  return useContext(SceneManagerContext);
}
