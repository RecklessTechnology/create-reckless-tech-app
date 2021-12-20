import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { Palette } from '@material-ui/core/styles/createPalette';
import grey from '@material-ui/core/colors/grey';

import App from './@RecklessCore/App/Render/index';

import AppManager from './@RecklessCore/App/Managers/AppManager';
import ThreeObjectsManager from './@RecklessCore/ThreeObjects/Managers/ThreeObjectsManager';
import PeersManager from './@RecklessCore/Peers/Managers/PeersManager';
import ConnectionsManager from './@RecklessCore/Connections/Managers/ConnectionsManager';

import DevicesManager from './@RecklessCore/Devices/Managers/DevicesManager';
import GeneratorsManager from './@RecklessCore/Generators/Managers/GeneratorsManager';
import TransformsManager from './@RecklessCore/Transforms/Managers/TransformsManager';
import WidgetsManager from './@RecklessCore/Widgets/Managers/WidgetsManager';

import InspectorMenuManager from './@RecklessCore/InspectorMenu/Managers/InspectorMenuManager';
import EditorMenuManager from './@RecklessCore/EditorMenu/Managers/EditorMenuManager';

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
                    <WidgetsManager>
                      <EditorMenuManager>
                        <InspectorMenuManager>
                          <App />
                        </InspectorMenuManager>
                      </EditorMenuManager>
                    </WidgetsManager>
                  </TransformsManager>
                </GeneratorsManager>
              </DevicesManager>
            </ConnectionsManager>
          </PeersManager>
        </ThreeObjectsManager>
      </AppManager>
    </ThemeProvider>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
