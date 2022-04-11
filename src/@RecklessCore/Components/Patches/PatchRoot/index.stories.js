import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import PatchRoot from './index';

import theme from '../../../../theme';

export default {
  title: 'Components/Patch/Root',
  component: PatchRoot.type,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

const Template = (data) => (<PatchRoot {...data}><span>Hello, world!</span></PatchRoot>);

Template.propTypes = PatchRoot.propTypes;

export const Default = Template.bind({});
Default.args = {
  width: 100,
};
