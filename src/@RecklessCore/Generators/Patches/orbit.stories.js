import 'typeface-roboto-material';

import Generator from './index';

import DefaultGeneratorProps from '../DefaultProps.json';
import DefaultProps from './DefaultProps.json';

export default {
  title: 'Generators/Orbit/Patch',
  component: Generator.type,
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
