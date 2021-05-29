import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";
import { Palette } from "@material-ui/core/styles/createPalette";

import App from './App';

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
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);