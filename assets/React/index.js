import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

import App from './App';

import { Provider } from 'react-redux'
import configureStore from './store';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#303030"
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={configureStore()}>
          <App />
        </Provider>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);