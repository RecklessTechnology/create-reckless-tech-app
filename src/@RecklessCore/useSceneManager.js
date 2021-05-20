import { useContext } from 'react';
import { SceneManagerContext } from './SceneManager';

export default function useSceneManager() {
    return useContext(SceneManagerContext);
}
