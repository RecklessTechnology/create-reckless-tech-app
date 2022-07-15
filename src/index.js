import './wdyr';

import React from 'react';
import { createRoot } from 'react-dom/client';

import 'typeface-roboto-material';

import ThemesManager from './@RecklessCore/Themes/Managers/ThemesManager';

import AppManager from './@RecklessCore/App/Managers/AppManager';

import App from './@RecklessCore/App';

// import reportWebVitals from './reportWebVitals';

import AudioAnalyzerScene from './scenes/AudioAnalyzerScene.json';
import LogoScene from './scenes/LogoScene.json';
import PosenetScene from './scenes/PosenetScene.json';
import TestScene from './scenes/TestScene.json';
import CoreManagers from './@RecklessCore/App/Managers/CoreManagers';
import { restoreData } from './@RecklessCore/Utils/PersistantStorage';

// eslint-disable-next-line no-undef
const root = createRoot(document.getElementById('htmlRoot'));
root.render(
  <React.StrictMode>
    <ThemesManager
      {
        ...{
          theme: 'Default',
          ...restoreData('themeSettings'),
        }
      }
    >
      <AppManager
        scenes={[
          LogoScene,
          AudioAnalyzerScene,
          PosenetScene,
          TestScene,
        ]}
      >
        <CoreManagers>
          <App />
        </CoreManagers>
      </AppManager>
    </ThemesManager>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
