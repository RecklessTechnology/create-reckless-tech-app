import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import InspectorCloseButtonView from './view';

import theme from '../../../../../theme';

export default {
  title: 'Components/Buttons/Inspector Close Button',
  component: InspectorCloseButtonView.type,
  argTypes: { setInspectorMenuOpen: { action: 'clicked' } },
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
  inspectorMenuOpen, setInspectorMenuOpen,
}) => (
  <InspectorCloseButtonView
    {...{
      inspectorMenuOpen,
      setInspectorMenuOpen,
    }}
  />
);

Template.propTypes = InspectorCloseButtonView.propTypes;

export const Default = Template.bind({});
Default.args = {
  inspectorMenuOpen: false,
};
