import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../App/Managers/AppManager';
import DevicesManager from '../Managers/DevicesManager';

import Device from './index';

import { devicesToFlow } from '../../Utils/toFlow';

import NodeEditorView from '../../EditorMenu/Render/NodeEditor/view';

import theme from '../../../theme';

export default {
  title: 'Patches/Device',
  component: Device,
  // argTypes: { onClick: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager>
          <DevicesManager>
            <Story />
          </DevicesManager>
        </AppManager>
      </ThemeProvider>
    ),
  ],
};

const Template = (data) => {
  const elements = devicesToFlow([data], [], 1);
  const nodeTypes = {
    device: Device,
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

Template.propTypes = Device.propTypes;

export const Default = Template.bind({});
Default.args = {
  uuid: 'xxx',
  type: 'camera',
  name: 'Example',
  userData: {
    isPatchHidden: false,
  },
};
