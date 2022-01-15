import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../App/Managers/AppManager';
import TransformsManager from '../Managers/TransformsManager';

import Transform from './index';

import { transformsToFlow } from '../../Utils/toFlow';

import NodeEditorView from '../../Editor/Components/NodeEditor/view';

import theme from '../../../theme';

export default {
  title: 'Editor/Patches/Transform',
  component: Transform,
  // argTypes: { onClick: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager>
          <TransformsManager>
            <Story />
          </TransformsManager>
        </AppManager>
      </ThemeProvider>
    ),
  ],
};

const Template = (data) => {
  const elements = transformsToFlow([data], [], 1);
  const nodeTypes = {
    transform: Transform,
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

Template.propTypes = Transform.propTypes;

export const Calculator = Template.bind({});
Calculator.args = {
  name: 'Calculator',
  type: 'calculator',
  uuid: 'xxx',
  userData: {
    isPatchHidden: false,
  },
};
