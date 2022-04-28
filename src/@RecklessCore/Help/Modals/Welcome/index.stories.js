import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import WelcomeModal from './index';

import darkTheme from '../../../Themes/dark';

export default {
  title: 'Components/Modals/Welcome Modal',
  component: WelcomeModal.type,
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
  <WelcomeModal />
);

Template.propTypes = WelcomeModal.propTypes;

export const Default = Template.bind({});
Default.args = {};
