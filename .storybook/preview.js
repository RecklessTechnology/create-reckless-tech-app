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
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}