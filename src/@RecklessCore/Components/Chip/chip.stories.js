import React from 'react';

import 'typeface-roboto-material';

import ChipView from './view';

export default {
  title: 'Design System/Chip/Default',
  component: ChipView,
};

const DefaultTemplate = (props) => (
  <ChipView {...props} />
);
DefaultTemplate.propTypes = ChipView.propTypes;

export const Default = DefaultTemplate.bind({
  label: 'hello',
});

Default.parameters = {
  componentSubtitle: 'Basic Material-UI Label',
  jest: ['label.test.js'],
  design: {
    type: 'figma',
    // url: 'https://www.figma.com/file/SPrXbcNZKwnxd8D7vsYWYc/Button',
  },
};
