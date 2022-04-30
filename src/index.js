import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto-material';

import ThemesManager from './@RecklessCore/Themes/Managers/ThemesManager';

import AppManager from './@RecklessCore/App/Managers/AppManager';
import ThreeObjectsManager from './@RecklessCore/ThreeObjects/Managers/ThreeObjectsManager';
import PeersManager from './@RecklessCore/Peers/Managers/PeersManager';
import ConnectionsManager from './@RecklessCore/Connections/Managers/ConnectionsManager';

import DevicesManager from './@RecklessCore/Devices/Managers/DevicesManager';
import MediaPlayersManager from './@RecklessCore/MediaPlayers/Managers/MediaPlayersManager';
import GeneratorsManager from './@RecklessCore/Generators/Managers/GeneratorsManager';
import TransformsManager from './@RecklessCore/Transforms/Managers/TransformsManager';
import WidgetsManager from './@RecklessCore/Widgets/Managers/WidgetsManager';

import InspectorMenuManager from './@RecklessCore/Inspector/Managers/InspectorMenuManager';
import EditorMenuManager from './@RecklessCore/Editor/Managers/EditorMenuManager';

import App from './@RecklessCore/App';

// import reportWebVitals from './reportWebVitals';

import AudioAnalyzerScene from './scenes/AudioAnalyzerScene.json';
import LogoScene from './scenes/LogoScene.json';
import PosenetScene from './scenes/PosenetScene.json';
import TestScene from './scenes/TestScene.json';

ReactDOM.render(
  <React.StrictMode>
    <ThemesManager theme="Dark">
      <AppManager
        scenes={[
          AudioAnalyzerScene,
          LogoScene,
          PosenetScene,
          TestScene,
        ]}
      >
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
                            <App />
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
    </ThemesManager>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
