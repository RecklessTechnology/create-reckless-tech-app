import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../App/Managers/AppManager';
import DevicesManager from '../Managers/DevicesManager';

import Device from './index';
import Provider from '../Providers/view';

import { devicesToFlow } from '../../Utils/toFlow';

import NodeEditorView from '../../Editor/Components/NodeEditor/view';

import theme from '../../../theme';

import testScene from './camera.stories.json';

export default {
  title: 'Devices/Camera/Patch',
  component: Device.type,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager sceneJSON={testScene}>
          <DevicesManager>
            <Story />
          </DevicesManager>
        </AppManager>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    data: { table: { disable: true }, control: { disable: true } },
  },
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
      <Provider connections={[{}]} {...data} />
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

export const Camera = Template.bind({});
Camera.args = {
  name: 'Camera',
  type: 'camera',
  uuid: 'xxx',
  userData: {
    isPatchHidden: false,
  },
};
