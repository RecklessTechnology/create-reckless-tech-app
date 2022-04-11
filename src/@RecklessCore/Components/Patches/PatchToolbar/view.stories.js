import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import PatchToolbar from './view';

import theme from '../../../../theme';

export default {
  title: 'Components/Patch/Toolbar',
  component: PatchToolbar.type,
  argTypes: {
    hidePatch: { action: 'clicked' },
    removeObj: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

const Template = (data) => (<PatchToolbar {...data} />);

Template.propTypes = PatchToolbar.propTypes;

export const Default = Template.bind({});
Default.args = {
  uuid: 'xxx',
};
