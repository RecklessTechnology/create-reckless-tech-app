import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import TabPanel from './index';

import darkTheme from '../../../Themes/dark';

export default {
  title: 'Pure Components/TabPanel',
  component: TabPanel.type,
  actions: { argTypesRegex: '^on.*' },
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

const Template = () => <TabPanel>Hello, world</TabPanel>;

Template.propTypes = TabPanel.propTypes;

export const Default = Template.bind({});
Default.args = {};
