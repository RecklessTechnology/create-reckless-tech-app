import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import WelcomeModal from './index';

import theme from '../../../../theme';

export default {
  title: 'Modals/Welcome Modal',
  component: WelcomeModal.type,
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
  <WelcomeModal />
);

Template.propTypes = WelcomeModal.propTypes;

export const Default = Template.bind({});
Default.args = {};
