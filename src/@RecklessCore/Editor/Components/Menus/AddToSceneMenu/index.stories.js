import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AddToSceneMenu from './index';

import darkTheme from '../../../../Themes/dark';
import AppManager from '../../../../App/Managers/AppManager';
import ConnectionsManager from '../../../../Connections/Managers/ConnectionsManager';
import PeersManager from '../../../../Peers/Managers/PeersManager';

export default {
  title: 'Components/Menus/Add to Scene',
  component: AddToSceneMenu.type,
  argTypes: { handleClick: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
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
