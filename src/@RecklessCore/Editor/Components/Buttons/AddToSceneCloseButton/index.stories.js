import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AddToSceneCloseButton from './index';

import darkTheme from '../../../../Themes/dark';

export default {
  title: 'Components/Buttons/Close Add To Scene',
  component: AddToSceneCloseButton.type,
  argTypes: { handleClose: { action: 'clicked' } },
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
  handleClose,
}) => (
  <AddToSceneCloseButton
    {...{
      handleClose,
    }}
  />
);

Template.propTypes = AddToSceneCloseButton.propTypes;

export const Default = Template.bind({});
Default.args = {
};
