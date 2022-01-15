import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import TabPanel from './index';

import theme from '../../../../theme';

export default {
  title: 'Primatives/TabPanel',
  component: TabPanel.type,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
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
