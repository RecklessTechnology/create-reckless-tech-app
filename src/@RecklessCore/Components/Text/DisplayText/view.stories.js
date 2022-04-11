import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import Component from './view';

import theme from '../../../../theme';

export default {
  title: 'Pure Components/Display Text',
  component: Component.type,
  actions: { argTypesRegex: '^on.*' },
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
