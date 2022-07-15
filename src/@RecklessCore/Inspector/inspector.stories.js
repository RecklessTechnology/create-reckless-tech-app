/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { action } from '@storybook/addon-actions';
// import { screen, userEvent } from '@storybook/testing-library';

import React from 'react';

import 'typeface-roboto-material';
import AppManager from '../App/Managers/AppManager';
import DefaultScene from '../../scenes/DefaultScene.json';

import CoreManagers from '../App/Managers/CoreManagers';

import InspectorView from './view';

export default {
  title: 'Menus/Inspector/Default',
  component: InspectorView,
};

const DefaultTemplate = (props) => (
  <AppManager
    scenes={[DefaultScene]}
  >
    <CoreManagers>
      <InspectorView {...props} />
    </CoreManagers>
  </AppManager>
);
DefaultTemplate.propTypes = InspectorView.propTypes;

export const Default = DefaultTemplate.bind({});
Default.args = {
  onClick: action('onClick'),
  editorMenuOpen: false,
  editorMenuHeight: 0,
  inspectorMenuWidth: 500,
  inspectorMenuOpen: true,
  inspectorMenuTab: 3,
  setInspectorMenuTab: () => {},
};

Default.parameters = {
  componentSubtitle: 'Inspector Menu',
  // jest: ['inspector.test.js'],
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/SPrXbcNZKwnxd8D7vsYWYc/Button',
  },
};
// Default.play = async () => { await userEvent.click(screen.getByRole('button')); };
