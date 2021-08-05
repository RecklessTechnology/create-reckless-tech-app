/* eslint-disable react/jsx-filename-extension */
import React, { useCallback, useEffect, useRef } from 'react';

import AppView from './AppView';
import World from './@RecklessCore/world';
import SceneManager from './@RecklessCore/managers/SceneManager';
import Scene from './@RecklessCore/Scene';
import DynamicScene from './@RecklessCore/scenes/Dynamic/index';

import useAppContext from './@RecklessCore/contexts/useAppContext';
import useEditorMenuContext from './@RecklessCore/contexts/useEditorMenuContext';
import useToolsMenuContext from './@RecklessCore/contexts/useToolsMenuContext';
import useInspectorMenuContext from './@RecklessCore/contexts/useInspectorMenuContext';

// import Outputs from './@RecklessCore/outputs/index';

const App = () => {
  const {
    publish, subscribe, sceneJSON, setSceneJSON,
  } = useAppContext();
  const { editorMenuHeight, editorMenuOpen, setEditorMenuOpen } = useEditorMenuContext();
  const { toolsMenuWidth, toolsMenuOpen, setToolsMenuOpen } = useToolsMenuContext();
  const { inspectorMenuWidth, inspectorMenuOpen, setInspectorMenuOpen } = useInspectorMenuContext();

  const isMounted = useRef(false);

  const updateScene = useCallback((data) => { // update data only when peer list is modified
    if (isMounted.current) {
      setSceneJSON(data);
    }
  }, [setSceneJSON]);

  useEffect(() => {
    if (sceneJSON !== undefined) {
      isMounted.current = true;
      subscribe('scene-changed', updateScene);
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted, updateScene, subscribe, sceneJSON]);

  return (
    <AppView {...{
      editorMenuOpen,
      editorMenuHeight,
      setEditorMenuOpen,
      toolsMenuOpen,
      toolsMenuWidth,
      setToolsMenuOpen,
      inspectorMenuOpen,
      inspectorMenuWidth,
      setInspectorMenuOpen,
    }}
    >
      <World {...{ sceneJSON }}>
        <SceneManager {...{ defaultScene: 'dynamic', publish }}>
          <Scene {...{ id: 'dynamic', sceneJSON }}>
            <DynamicScene {...{ sceneJSON }} />
          </Scene>
        </SceneManager>
      </World>
    </AppView>
  );
};

App.whyDidYouRender = true;

export default App;
