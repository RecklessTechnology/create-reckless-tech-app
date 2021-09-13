/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { Palette } from '@material-ui/core/styles/createPalette';
import grey from '@material-ui/core/colors/grey';

import App from './App';

import AppManager from './@RecklessCore/managers/AppManager';
import ThreeObjectsManager from './@RecklessCore/managers/ThreeObjectsManager';
import PeersManager from './@RecklessCore/managers/PeersManager';
import ConnectionsManager from './@RecklessCore/managers/ConnectionsManager';

import DevicesManager from './@RecklessCore/managers/DevicesManager';
import GeneratorsManager from './@RecklessCore/managers/GeneratorsManager';
import TransformsManager from './@RecklessCore/managers/TransformsManager';

import InspectorMenuManager from './@RecklessCore/managers/InspectorMenuManager';
import EditorMenuManager from './@RecklessCore/managers/EditorMenuManager';

// import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: grey[900],
      paper: grey[900],
    },
    ...Palette,
    primary: {
      main: grey[700],
    },
    secondary: {
      main: grey[500],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppManager>
        <ThreeObjectsManager>
          <PeersManager>
            <ConnectionsManager>
              <DevicesManager>
                <GeneratorsManager>
                  <TransformsManager>
                    <EditorMenuManager>
                      <InspectorMenuManager>
                        <App />
                      </InspectorMenuManager>
                    </EditorMenuManager>
                  </TransformsManager>
                </GeneratorsManager>
              </DevicesManager>
            </ConnectionsManager>
          </PeersManager>
        </ThreeObjectsManager>
      </AppManager>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
