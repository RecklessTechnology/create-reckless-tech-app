import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../App/Managers/AppManager';
import GeneratorsManager from '../Managers/GeneratorsManager';

import Generator from './index';
import Provider from '../Providers/view';

import { generatorsToFlow } from '../../Utils/toFlow';

import NodeEditorView from '../../EditorMenu/Render/NodeEditor/view';

import theme from '../../../theme';

export default {
  title: 'Editor/Patches/Generator',
  component: Generator.type,
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
  argTypes: {
    data: { table: { disable: true }, control: { disable: true } },
  },
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
      <Provider connection={{}} {...data} />
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

export const Sinewave = Template.bind({});
Sinewave.args = {
  name: 'Sinewave',
  type: 'sinewave',
  resolution: 32,
  rpm: 30,
  looped: true,
  paused: false,
  uuid: 'xxx',
  userData: {
    isPatchHidden: false,
  },
};
