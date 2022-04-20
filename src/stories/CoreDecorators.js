import PropTypes from 'prop-types';

import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../@RecklessCore/App/Managers/AppManager';
import ThreeObjectsManager from '../@RecklessCore/ThreeObjects/Managers/ThreeObjectsManager';
import PeersManager from '../@RecklessCore/Peers/Managers/PeersManager';
import ConnectionsManager from '../@RecklessCore/Connections/Managers/ConnectionsManager';

import DevicesManager from '../@RecklessCore/Devices/Managers/DevicesManager';
import MediaPlayersManager from '../@RecklessCore/MediaPlayers/Managers/MediaPlayersManager';
import GeneratorsManager from '../@RecklessCore/Generators/Managers/GeneratorsManager';
import TransformsManager from '../@RecklessCore/Transforms/Managers/TransformsManager';
import WidgetsManager from '../@RecklessCore/Widgets/Managers/WidgetsManager';

import InspectorMenuManager from '../@RecklessCore/Inspector/Managers/InspectorMenuManager';
import EditorMenuManager from '../@RecklessCore/Editor/Managers/EditorMenuManager';

import theme from '../theme';

import AppView from '../@RecklessCore/App/view';
import World from '../@RecklessCore/World';
import useEditorMenuContext from '../@RecklessCore/Editor/Contexts/useEditorMenuContext';
import useInspectorMenuContext from '../@RecklessCore/Inspector/Contexts/useInspectorMenuContext';

// eslint-disable-next-line react/prop-types
const AppContent = ({ sceneJSON, children }) => {
  const {
    editorMenuOpen, setEditorMenuOpen,
  } = useEditorMenuContext();
  const {
    inspectorMenuWidth, inspectorMenuOpen, setInspectorMenuOpen,
  } = useInspectorMenuContext();
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        display: 'inline-block',
        clear: 'both',
      }}
    >
      <AppView {...{
        editorMenuOpen,
        editorMenuHeight: 100,
        setEditorMenuOpen,
        inspectorMenuOpen,
        inspectorMenuWidth,
        setInspectorMenuOpen,
        sceneJSON,
      }}
      >
        <World {...{ sceneJSON }}>
          {children}
        </World>
      </AppView>
    </div>
  );
};

const CoreDecorators = ({ sceneJSON, children }) => (
  <ThemeProvider {...{ theme }}>
    <CssBaseline />
    <AppManager {...{ sceneJSON }}>
      <ThreeObjectsManager>
        <PeersManager>
          <ConnectionsManager>
            <DevicesManager>
              <MediaPlayersManager>
                <GeneratorsManager>
                  <TransformsManager>
                    <WidgetsManager>
                      <EditorMenuManager>
                        <InspectorMenuManager>
                          <AppContent {...{ sceneJSON }}>
                            { children }
                          </AppContent>
                        </InspectorMenuManager>
                      </EditorMenuManager>
                    </WidgetsManager>
                  </TransformsManager>
                </GeneratorsManager>
              </MediaPlayersManager>
            </DevicesManager>
          </ConnectionsManager>
        </PeersManager>
      </ThreeObjectsManager>
    </AppManager>
  </ThemeProvider>
);

CoreDecorators.propTypes = {
  children: PropTypes.node.isRequired,
  sceneJSON: PropTypes.shape({}).isRequired,
};

export default CoreDecorators;
