import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../App/Managers/AppManager';
import ThreeObjectsManager from '../Managers/ThreeObjectsManager';

import ThreeObject from './index';

import { sceneGraphToFlow } from '../../Utils/toFlow';

import NodeEditorView from '../../Editor/Components/NodeEditor/view';

import darkTheme from '../../Themes/dark';

export default {
  title: '3D Objects/Patch',
  component: ThreeObject,
  // argTypes: { onClick: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
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

export const Mesh = Template.bind({});
Mesh.args = {
  type: 'mesh',
  name: 'Mesh',
  geometry: 'xxx',
  material: 'xxx',
  uuid: 'xxx',
  userData: {
    isPatchHidden: false,
  },
};

export const Group = Template.bind({});
Group.args = {
  type: 'group',
  name: 'Group',
  geometry: 'xxx',
  material: 'xxx',
  uuid: 'xxx',
  userData: {
    isPatchHidden: false,
  },
};

export const GLTF = Template.bind({});
GLTF.args = {
  type: 'gltf',
  name: 'GLTF',
  geometry: 'xxx',
  material: 'xxx',
  uuid: 'xxx',
  userData: {
    isPatchHidden: false,
  },
};
