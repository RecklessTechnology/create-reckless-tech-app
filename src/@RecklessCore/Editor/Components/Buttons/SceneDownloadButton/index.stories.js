import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import SceneDownloadButton from './index';

import theme from '../../../../../theme';
import AppManager from '../../../../App/Managers/AppManager';

export default {
  title: 'Components/Buttons/Download Scene',
  component: SceneDownloadButton.type,
  argTypes: { handleClose: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager>
          <Story />
        </AppManager>
      </ThemeProvider>
    ),
  ],
};

const Template = ({
  handleClose,
}) => (
  <SceneDownloadButton
    {...{
      handleClose,
    }}
  />
);

Template.propTypes = SceneDownloadButton.propTypes;

export const Default = Template.bind({});
Default.args = {
};
