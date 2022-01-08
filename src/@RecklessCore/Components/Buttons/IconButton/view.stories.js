import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from './view';

import theme from '../../../../theme';

export default {
  title: 'Components/Icon Button',
  component: IconButtonView,
  argTypes: { handeClick: { action: 'clicked' } },
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
  label, handeClick, className, disabled,
}) => (
  <IconButtonView
    {...{
      label,
      handeClick,
      className,
      disabled,
    }}
  >
    <CloseIcon fontSize="small" />
  </IconButtonView>
);

Template.propTypes = IconButtonView.propTypes;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  label: 'Close',
  className: 'iconButton',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Disabled',
  className: 'iconButton',
};
