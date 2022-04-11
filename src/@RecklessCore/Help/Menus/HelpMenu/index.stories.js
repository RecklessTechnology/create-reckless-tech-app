import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import HelpMenu from './index';

import theme from '../../../../theme';

export default {
  title: 'Components/Menus/Help Menu',
  component: HelpMenu.type,
  argTypes: { handeClick: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

const Template = () => (
  <HelpMenu />
);

Template.propTypes = HelpMenu.propTypes;

export const Default = Template.bind({});
Default.args = {};
