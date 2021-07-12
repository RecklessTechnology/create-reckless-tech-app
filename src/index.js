import './wdyr'; // <--- first import

import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";
import { Palette } from "@material-ui/core/styles/createPalette";

import AppManager from './@RecklessCore/managers/AppManager';
import ConnectionsManager from './@RecklessCore/managers/ConnectionsManager';
import InspectorMenuManager from './@RecklessCore/managers/InspectorMenuManager';
import ToolsMenuManager from './@RecklessCore/managers/ToolsMenuManager';
import EditorMenuManager from './@RecklessCore/managers/EditorMenuManager';

import App from './App';
import PeersManager from './@RecklessCore/managers/PeersManager';
import ThreeObjectsManager from './@RecklessCore/managers/ThreeObjectsManager';
import GeneratorsManager from './@RecklessCore/managers/GeneratorsManager';
import DevicesManager from './@RecklessCore/managers/DevicesManager';
import TransformsManager from './@RecklessCore/managers/TransformsManager';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#303030"
    },
    ...Palette,
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
                    <ToolsMenuManager>
                      <InspectorMenuManager>
                        <App />
                      </InspectorMenuManager>
                    </ToolsMenuManager>
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
  document.getElementById('root')
);