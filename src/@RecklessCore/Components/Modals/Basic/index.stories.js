import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import BasicModal from './index';

import darkTheme from '../../../Themes/dark';

export default {
  title: 'Pure Components/Modal',
  component: BasicModal.type,
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

const Template = () => (
  <BasicModal defaultOpen>
    Hello
  </BasicModal>
);

Template.propTypes = BasicModal.propTypes;

export const Default = Template.bind({});
Default.args = {};
