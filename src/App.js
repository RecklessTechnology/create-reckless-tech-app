import { useCallback } from 'react';

import AppView from './AppView';
import World from './@RecklessCore/world';
import SceneManager from './@RecklessCore/managers/SceneManager';
import Scene from './@RecklessCore/Scene';
import DynamicScene from './@RecklessCore/scenes/Dynamic/index';

import useAppContext from './@RecklessCore/contexts/useAppContext';
import useEditorMenuContext from './@RecklessCore/contexts/useEditorMenuContext';
import useToolsMenuContext from './@RecklessCore/contexts/useToolsMenuContext';
import useInspectorMenuContext from './@RecklessCore/contexts/useInspectorMenuContext';

import Outputs from './@RecklessCore/outputs/index';


const App = () => {
  const { publish, subscribe, sceneJSON, setSceneJSON } = useAppContext();
  const { editorMenuHeight, editorMenuOpen, setEditorMenuOpen } = useEditorMenuContext();
  const { toolsMenuWidth, toolsMenuOpen, setToolsMenuOpen } = useToolsMenuContext();
  const { inspectorMenuWidth, inspectorMenuOpen, setInspectorMenuOpen } = useInspectorMenuContext();
  
  const updateScene = useCallback((data) => { //update data only when peer list is modified
    setSceneJSON(data);
  }, [setSceneJSON]);

  subscribe('scene-changed', updateScene);

  return(
    <AppView {...{
      editorMenuOpen: editorMenuOpen,
      editorMenuHeight: editorMenuHeight,
      setEditorMenuOpen,
      toolsMenuOpen: toolsMenuOpen,
      toolsMenuWidth: toolsMenuWidth,
      setToolsMenuOpen,
      inspectorMenuOpen: inspectorMenuOpen,
      inspectorMenuWidth: inspectorMenuWidth,
      setInspectorMenuOpen
    }}>
      <Outputs  {...{sceneJSON:sceneJSON}} />
      <World {...{sceneJSON:sceneJSON}}>
        <SceneManager {...{defaultScene:'dynamic', publish:publish}}>
          <Scene  {...{id:'dynamic', sceneJSON:sceneJSON}}>
            <DynamicScene {...{sceneJSON:sceneJSON}}/>
          </Scene>
        </SceneManager>
      </World>
    </AppView>
  )
}

App.whyDidYouRender = true;

export default App;
