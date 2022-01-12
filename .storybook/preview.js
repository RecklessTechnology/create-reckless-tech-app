import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import theme from '../src/theme';

export const parameters = {
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'default',
        value: theme.palette.background.default,
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Intro', 'Features', 'Rooms & Sharing', 'Devices & Peers', 'Generators & Transforms', 'Scene JSON', 'Editor', ['Patches', ['*', 'Components']], '*', 'Primatives'],
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
  actions: { argTypesRegex: '^on.*' },
}