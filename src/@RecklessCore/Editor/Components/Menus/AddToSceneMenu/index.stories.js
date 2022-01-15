import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AddToSceneMenu from './index';

import theme from '../../../../../theme';
import AppManager from '../../../../App/Managers/AppManager';
import ConnectionsManager from '../../../../Connections/Managers/ConnectionsManager';
import PeersManager from '../../../../Peers/Managers/PeersManager';

export default {
  title: 'Menus/Add to Scene',
  component: AddToSceneMenu.type,
  argTypes: { handeClick: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager>
          <PeersManager>
            <ConnectionsManager>
              <Story />
            </ConnectionsManager>
          </PeersManager>
        </AppManager>
      </ThemeProvider>
    ),
  ],
};

const Template = () => <AddToSceneMenu />;

Template.propTypes = AddToSceneMenu.propTypes;

export const Default = Template.bind({});
Default.args = {};
