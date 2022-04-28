import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import { withTests } from '@storybook/addon-jest';
import { withDesign } from 'storybook-addon-designs'

import ThemesManager from '../src/@RecklessCore/Themes/Managers/ThemesManager';

import results from '../src/tests/jest-test-results.json';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components.',
    defaultValue: 'Dark',
    toolbar: {
      icon: 'circlehollow',
      items: ['Light', 'Dark', 'RetroWave', 'Garden'],
      showName: true,
    },
  },
};

const withThemeProvider = (Story, {globals}) => {
  const { theme } = globals;
  return (
    <ThemesManager theme={theme}><Story /></ThemesManager>
  );
};

export const decorators = [
  withThemeProvider,
  withDesign,
  withTests({
    results,
  }),
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