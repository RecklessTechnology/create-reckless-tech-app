import React from 'react';

import 'typeface-roboto-material';

import InspectorCloseButtonView from './view';

export default {
  title: 'Components/Buttons/Inspector Close Button',
  component: InspectorCloseButtonView.type,
};

const Template = (props) => (
  <InspectorCloseButtonView {...props} />
);

Template.propTypes = InspectorCloseButtonView.propTypes;

export const Default = Template.bind({});
Default.args = {
};
