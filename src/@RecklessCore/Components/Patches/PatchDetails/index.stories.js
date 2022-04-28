import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import PatchDetails from './index';

import darkTheme from '../../../Themes/dark';

export default {
  title: 'Components/Patch/Details',
  component: PatchDetails.type,
  argTypes: {
    type: {
      options: ['mesh', 'group'],
      control: { type: 'select' },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

const Template = (data) => (<PatchDetails {...data} />);

Template.propTypes = PatchDetails.propTypes;

export const Default = Template.bind({});
Default.args = {
  name: 'Patch',
  uuid: 'xxx',
  type: 'mesh',
};
