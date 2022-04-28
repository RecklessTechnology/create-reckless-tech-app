/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { action } from '@storybook/addon-actions';
import { screen, userEvent } from '@storybook/testing-library';

import React from 'react';

import 'typeface-roboto-material';

import ButtonView from './view';

export default {
  title: 'Design System/Button/Default',
  component: ButtonView,
};

const DefaultTemplate = (props) => (
  <ButtonView {...props}>Default</ButtonView>
);
DefaultTemplate.propTypes = ButtonView.propTypes;

export const Default = DefaultTemplate.bind({});
Default.args = { onClick: action('onClick') };

Default.parameters = {
  componentSubtitle: 'Basic Material-UI Button',
  jest: ['button.test.js'],
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/SPrXbcNZKwnxd8D7vsYWYc/Button',
  },
};
Default.play = async () => { await userEvent.click(screen.getByRole('button')); };
