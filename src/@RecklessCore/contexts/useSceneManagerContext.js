/* eslint-disable import/no-cycle */

import { useContext } from 'react';

import { SceneManagerContext } from '../managers/SceneManager';

export default function useSceneManager() {
  return useContext(SceneManagerContext);
}
