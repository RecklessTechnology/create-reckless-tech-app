import React from 'react';

import 'typeface-roboto-material';

import AvatarView from './view';

export default {
  title: 'Design System/Avatar/Default',
  component: AvatarView,
};

const DefaultTemplate = (props) => (
  <AvatarView {...props} />
);
DefaultTemplate.propTypes = AvatarView.propTypes;

export const Default = DefaultTemplate.bind({});

Default.args = {
  size: 'medium',
  username: 'Jerknose',
  src: 'https://avatars.githubusercontent.com/u/6080018?v=4',
};
Default.parameters = {
  jest: ['avatar.test.js'],
};
