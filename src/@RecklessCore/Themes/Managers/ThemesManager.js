import PropTypes from 'prop-types';

import React from 'react';

import { ThemeProvider } from '@material-ui/styles';
import {
  CssBaseline,
} from '@material-ui/core';

import Light from '../light';
import Dark from '../dark';
import RetroWave from '../RetroWave';
import Garden from '../Garden';

const ThemesManager = ({ theme, children }) => {
  const themes = {
    Light, Dark, Garden, RetroWave,
  };
  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

ThemesManager.propTypes = {
  theme: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

ThemesManager.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default ThemesManager;
