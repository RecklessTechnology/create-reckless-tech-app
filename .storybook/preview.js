import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import { withThemes } from '@react-theming/storybook-addon';

import { withTests } from '@storybook/addon-jest';
import { withDesign } from 'storybook-addon-designs'

import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core';

import ThemesManager from '../src/@RecklessCore/Themes/Managers/ThemesManager';

import lightTheme from '../src/@RecklessCore/Themes/light';
import darkTheme from '../src/@RecklessCore/Themes/dark';
import RetroWave from '../src/@RecklessCore/Themes/RetroWave';
import Garden from '../src/@RecklessCore/Themes/Garden';

import results from '../src/tests/jest-test-results.json';

import { restoreData } from '../src/@RecklessCore/Utils/PersistantStorage';

const providerFn = ({ theme, children }) => {
  return (
    <ThemesManager
      {
        ...{
          ...restoreData('themeSettings'),
          theme: theme.themeName,
        }
      }
    >
      {children}
    </ThemesManager>
  );
};

export const decorators = [
  // withThemeProvider,
  withDesign,
  withTests({
    results,
  }),
  withThemes(null, [
    createMuiTheme(darkTheme),
    createMuiTheme(lightTheme),
    createMuiTheme(RetroWave),
    createMuiTheme(Garden),
  ], { providerFn })
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Intro', 'Features', 'Rooms & Sharing', 'Devices & Peers', 'Generators & Transforms', 'Scene JSON', 'Devices', 'MediaPlayers', 'Transforms', 'Generators', '3D Objects', '*', 'Pure Components'],
    },
  },
  docs: {
    source: {
      type: 'code',
    },
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
        <Stories />
      </>
    ),
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
}