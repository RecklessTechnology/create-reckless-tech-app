/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { MenuItem } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { screen, userEvent } from '@storybook/testing-library';

import React from 'react';

import 'typeface-roboto-material';

import SelectView from './view';

export default {
  title: 'Design System/Select/Default',
  component: SelectView,
};

const DefaultTemplate = (props) => (
  <SelectView {...props}>
    <MenuItem value="Hello">
      Hello
    </MenuItem>
    <MenuItem value="World">
      World
    </MenuItem>
  </SelectView>
);
DefaultTemplate.propTypes = SelectView.propTypes;

export const Default = DefaultTemplate.bind({});
Default.args = {
  value: 'Hello',
  onClick: action('onClick'),
};

Default.parameters = {
  componentSubtitle: 'Basic Material-UI Select',
  jest: ['select.test.js'],
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ay33oeIOXt2PHCMqX43lj5/Select',
  },
};
Default.play = async () => { await userEvent.click(screen.getByRole('button')); };
