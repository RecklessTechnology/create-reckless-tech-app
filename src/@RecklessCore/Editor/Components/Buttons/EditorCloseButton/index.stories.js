import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import EditorCloseButton from './index';

import darkTheme from '../../../../Themes/dark';
import AppManager from '../../../../App/Managers/AppManager';
import EditorMenuManager from '../../../Managers/EditorMenuManager';

export default {
  title: 'Components/Buttons/Close Editor',
  component: EditorCloseButton.type,
  argTypes: { handleClose: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppManager>
          <EditorMenuManager>
            <Story />
          </EditorMenuManager>
        </AppManager>
      </ThemeProvider>
    ),
  ],
};

const Template = ({
  handleClose,
}) => (
  <EditorCloseButton
    {...{
      handleClose,
    }}
  />
);

Template.propTypes = EditorCloseButton.propTypes;

export const Default = Template.bind({});
Default.args = {
};
