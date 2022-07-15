import React from 'react';

import 'typeface-roboto-material';

import LabelView from './view';

export default {
  title: 'Design System/Label/Default',
  component: LabelView,
};

const DefaultTemplate = (props) => (
  <LabelView {...props}>Default</LabelView>
);
DefaultTemplate.propTypes = LabelView.propTypes;

export const Default = DefaultTemplate.bind({});

Default.parameters = {
  componentSubtitle: 'Basic Material-UI Label',
  jest: ['label.test.js'],
  design: {
    type: 'figma',
    // url: 'https://www.figma.com/file/SPrXbcNZKwnxd8D7vsYWYc/Button',
  },
};
