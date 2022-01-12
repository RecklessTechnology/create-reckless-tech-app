import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import RTSelect from './index';

import theme from '../../../../theme';

export default {
  title: 'Primatives/Select',
  component: RTSelect.type,
  argTypes: { onChange: { action: 'changed' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

const Template = ({
  data, value, onChange,
}) => (
  <RTSelect
    {...{
      data,
      value,
      onChange,
    }}
  />
);

Template.propTypes = RTSelect.propTypes;

export const Default = Template.bind({});
Default.args = {
  data: ['value 1', 'value 2', 'value 3'],
  value: 'value 1',
};
