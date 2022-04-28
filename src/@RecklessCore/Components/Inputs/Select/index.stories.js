import React, { useState } from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import RTSelect from './index';

import darkTheme from '../../../Themes/dark';

export default {
  title: 'Pure Components/Select',
  component: RTSelect.type,
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

const Template = ({
  data, value,
}) => {
  const [localVal, setLocalVal] = useState(value);
  const onChange = (e) => {
    setLocalVal(e.target.value);
  };
  return (
    <RTSelect
      {...{
        data,
        value: localVal,
        onChange,
      }}
    />
  );
};

Template.propTypes = RTSelect.propTypes;

export const Default = Template.bind({});
Default.args = {
  data: ['value 1', 'value 2', 'value 3'],
  value: 'value 1',
};
