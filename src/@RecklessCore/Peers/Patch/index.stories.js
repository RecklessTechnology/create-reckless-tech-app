import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../App/Managers/AppManager';
import PeersManager from '../Managers/PeersManager';

import Peer from './index';

import { peersToFlow } from '../../Utils/toFlow';

import NodeEditorView from '../../EditorMenu/Render/NodeEditor/view';

import theme from '../../../theme';

export default {
  title: 'Patches/Peer',
  component: Peer,
  // argTypes: { onClick: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager>
          <PeersManager>
            <Story />
          </PeersManager>
        </AppManager>
      </ThemeProvider>
    ),
  ],
};

const Template = (data) => {
  const elements = peersToFlow([data], [], 1);
  const nodeTypes = {
    peer: Peer,
  };

  return (
    <div style={{
      display: 'block',
      width: '100vh',
      height: '50vh',
    }}
    >
      <NodeEditorView {...{
        elements: [
          ...elements,
        ],
        nodeTypes,
        edgeTypes: {},
        updateConnection: () => {},
        addConnection: () => {},
        showControls: false,
        interactive: false,
      }}
      />
    </div>
  );
};

Template.propTypes = Peer.propTypes;

export const Default = Template.bind({});
Default.args = {
  type: 'peer',
  name: 'Peer',
  uuid: 'xxx',
  userData: {
    isPatchHidden: false,
  },
};
