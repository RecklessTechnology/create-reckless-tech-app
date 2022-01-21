import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import RTSelectWithIcon from './index';

import theme from '../../../../theme';

export default {
  title: 'Pure Components/Select with Icons',
  component: RTSelectWithIcon.type,
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
  <RTSelectWithIcon
    {...{
      data,
      value,
      onChange,
    }}
  />
);

Template.propTypes = RTSelectWithIcon.propTypes;

export const Default = Template.bind({});
Default.args = {
  data: ['value 1', 'value 2', 'value 3'],
  value: 'value 1',
};
