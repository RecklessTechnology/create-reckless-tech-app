import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import EditorToolbarView from './view';

import theme from '../../../../../theme';
import AppManager from '../../../../App/Managers/AppManager';
import EditorMenuManager from '../../../Managers/EditorMenuManager';

import testScene from './view.scene.json';

export default {
  title: 'Components/Toolbars/Editor Toolbar',
  component: EditorToolbarView.type,
  argTypes: { handeClick: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager sceneJSON={testScene}>
          <EditorMenuManager>
            <Story />
          </EditorMenuManager>
        </AppManager>
      </ThemeProvider>
    ),
  ],
};

const Template = () => (
  <EditorToolbarView
    {...{ sceneJSON: testScene }}
  />
);

Template.propTypes = EditorToolbarView.propTypes;

export const Default = Template.bind({});
Default.args = {
};
