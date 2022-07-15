import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import HelpMenu from './index';

import darkTheme from '../../../Themes/dark';

export default {
  title: 'Components/Menus/Help Menu',
  component: HelpMenu.type,
  argTypes: { handleClick: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
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
