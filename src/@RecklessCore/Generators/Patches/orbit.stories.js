import React from 'react';

import 'typeface-roboto-material';

import CoreDecorators from '../../../stories/CoreDecorators';

import Generator from './index';

import DefaultGeneratorProps from '../DefaultProps.json';
import DefaultProps from './DefaultProps.json';
import testScene from './orbit.scene.json';

export default {
  title: 'Generators/Orbit/Patch',
  component: Generator.type,
  decorators: [
    (Story) => (
      // Builds Reckless Tech app framework around story.
      <CoreDecorators sceneJSON={testScene}>
        <Story />
      </CoreDecorators>
    ),
  ],
  argTypes: {
    data: { table: { disable: true }, control: { disable: true } },
  },
};

const Template = () => null;

Template.propTypes = Generator.propTypes;

export const Calculator = Template.bind({});
Calculator.args = {
  ...DefaultGeneratorProps,
  ...DefaultProps,
  uuid: 'test-orbit-1',
  name: 'Orbit Generator',
};
