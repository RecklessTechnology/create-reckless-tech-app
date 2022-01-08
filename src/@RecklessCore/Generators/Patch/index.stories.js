import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../App/Managers/AppManager';
import GeneratorsManager from '../Managers/GeneratorsManager';

import Generator from './index';

import { generatorsToFlow } from '../../Utils/toFlow';

import NodeEditorView from '../../EditorMenu/Render/NodeEditor/view';

import theme from '../../../theme';

export default {
  title: 'Patches/Generator',
  component: Generator,
  // argTypes: { onClick: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager>
          <GeneratorsManager>
            <Story />
          </GeneratorsManager>
        </AppManager>
      </ThemeProvider>
    ),
  ],
};

const Template = (data) => {
  const elements = generatorsToFlow([data], [], 1);
  const nodeTypes = {
    generator: Generator,
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

Template.propTypes = Generator.propTypes;

export const Default = Template.bind({});
Default.args = {
  uuid: 'xxx',
  type: 'camera',
  name: 'Example',
  userData: {
    isPatchHidden: false,
  },
};
