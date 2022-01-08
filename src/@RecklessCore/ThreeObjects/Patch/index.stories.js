import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../App/Managers/AppManager';
import ThreeObjectsManager from '../Managers/ThreeObjectsManager';

import ThreeObject from './index';

import { sceneGraphToFlow } from '../../Utils/toFlow';

import NodeEditorView from '../../EditorMenu/Render/NodeEditor/view';

import theme from '../../../theme';

export default {
  title: 'Patches/Three Object',
  component: ThreeObject,
  // argTypes: { onClick: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager>
          <ThreeObjectsManager>
            <Story />
          </ThreeObjectsManager>
        </AppManager>
      </ThemeProvider>
    ),
  ],
};

const Template = (data) => {
  const elements = sceneGraphToFlow([data], [], 1);
  const nodeTypes = {
    threeObj: ThreeObject,
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

Template.propTypes = ThreeObject.propTypes;

export const Default = Template.bind({});
Default.args = {
  uuid: 'xxx',
  type: 'mesh',
  name: 'Example',
  userData: {
    isPatchHidden: false,
  },
  geometry: 'xxx',
  material: 'xxx',
};
