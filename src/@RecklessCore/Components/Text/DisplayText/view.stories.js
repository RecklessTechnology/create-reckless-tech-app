import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import Component from './view';

import darkTheme from '../../../Themes/dark';

export default {
  title: 'Pure Components/Display Text',
  component: Component.type,
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
  children, className, variant,
}) => (
  <Component
    {...{
      className,
      variant,
    }}
  >
    {children}
  </Component>
);

Template.propTypes = Component.propTypes;

export const Default = Template.bind({});
Default.args = {
  children: 'Reckless.Technology',
  className: '',
  variant: 'h1',
};
