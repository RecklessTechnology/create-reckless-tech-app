import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../../../App/Managers/AppManager';
import InspectorMenuManager from '../../../Managers/InspectorMenuManager';

import InspectorToolbarView from './view';

import theme from '../../../../../theme';

export default {
  title: 'Toolbars/Inspector Toolbar',
  component: InspectorToolbarView.type,
  argTypes: { handleChange: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager>
          <InspectorMenuManager>
            <Story />
          </InspectorMenuManager>
        </AppManager>
      </ThemeProvider>
    ),
  ],
};

const Template = ({
  value, handleChange,
}) => (
  <InspectorToolbarView
    {...{
      value,
      handleChange,
    }}
  />
);

Template.propTypes = InspectorToolbarView.propTypes;

export const Default = Template.bind({});
Default.args = {
  value: 1,
};
