/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';

import React, {
  createContext, useMemo, useState,
  useCallback,
  useEffect,
} from 'react';

import { ThemeProvider } from '@material-ui/styles';
import {
  CssBaseline,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core';

import Light from '../light';
import Dark from '../dark';
import RetroWave from '../RetroWave';
import Garden from '../Garden';

import { restoreData, persistData } from '../../Utils/PersistantStorage';

export const ThemesContext = createContext(null);
ThemesContext.displayName = 'App Context';

// eslint-disable-next-line import/no-mutable-exports
export let themesContextValue = {};

const ThemesManager = ({
  theme: passedTheme,
  font: passedFont,
  fontSize: passedFontSize,
  density: passedDensity,
  showLabels: passedShowLabels,
  children,
}) => {
  const [theme, setTheme] = useState(passedTheme);
  useEffect(() => { setTheme(passedTheme); }, [passedTheme]);
  const changeTheme = useCallback((t) => {
    persistData('themeSettings', {
      ...restoreData('themeSettings'),
      theme: t,
    });
    setTheme(t);
  }, [setTheme]);

  const [font, setFont] = useState(passedFont);
  useEffect(() => { setFont(passedFont); }, [passedFont]);
  const changeFont = useCallback((f) => {
    persistData('themeSettings', {
      ...restoreData('themeSettings'),
      font: f,
    });
    setFont(f);
  }, [setFont]);

  const [fontSize, setFontSize] = useState(passedFontSize);
  useEffect(() => { setFontSize(passedFontSize); }, [passedFontSize]);
  const changeFontSize = useCallback((fs) => {
    persistData('themeSettings', {
      ...restoreData('themeSettings'),
      fontSize: fs,
    });
    setFontSize(fs);
  }, [setFontSize]);

  const [density, setDensity] = useState(passedDensity);
  useEffect(() => { setDensity(passedDensity); }, [passedDensity]);
  const changeDensity = useCallback((d) => {
    persistData('themeSettings', {
      ...restoreData('themeSettings'),
      density: d,
    });
    setDensity(d);
  }, [setDensity]);

  const [showLabels, setShowLabels] = useState(passedShowLabels);
  useEffect(() => { setShowLabels(passedShowLabels); }, [passedShowLabels]);
  const changeShowLabels = useCallback((s) => {
    persistData('themeSettings', {
      ...restoreData('themeSettings'),
      showLabels: s,
    });
    setShowLabels(s);
  }, [setShowLabels]);

  themesContextValue = useMemo(() => ({
    themes: {
      Dark, Light, Garden, RetroWave,
    },
    theme,
    changeTheme,
    fonts: {},
    font,
    changeFont,
    fontSizes: {
      small: '',
      medium: '',
      large: '',
    },
    fontSize,
    changeFontSize,
    densities: {
      noSpacing: 0,
      standard: [0, 4, 8, 16, 32, 64],
      custom: (factor) => `${0.25 * factor}rem`,
    },
    density,
    changeDensity,
    showLabels,
    changeShowLabels,
  }), [
    theme, changeTheme,
    font, changeFont,
    fontSize, changeFontSize,
    density, changeDensity,
    showLabels, changeShowLabels,
  ]);
  return (
    <ThemesContext.Provider value={themesContextValue}>
      <ThemeProvider theme={createMuiTheme({
        ...themesContextValue.themes[themesContextValue.theme],
        // spacing: themesContextValue.densities[themesContextValue.density],
      })}
      >
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemesContext.Provider>
  );
};

ThemesManager.defaultProps = {
  theme: 'Dark',
  font: '',
  fontSize: 'medium',
  density: 'noSpacing',
  showLabels: false,
};

ThemesManager.propTypes = {
  theme: PropTypes.string,
  font: PropTypes.string,
  fontSize: PropTypes.string,
  density: PropTypes.string,
  showLabels: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

ThemesManager.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default ThemesManager;
