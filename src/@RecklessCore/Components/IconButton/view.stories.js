/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { action } from '@storybook/addon-actions';
import { screen, userEvent } from '@storybook/testing-library';

import React from 'react';

import 'typeface-roboto-material';

import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from './view';

export default {
  title: 'Design System/Icon Button/Default',
  component: IconButtonView.type,
};

const Template = ({ fontSize, ...props }) => (
  <IconButtonView
    fontSize={fontSize}
    {...props}
  >
    <CloseIcon fontSize={fontSize} />
  </IconButtonView>
);

Template.propTypes = IconButtonView.propTypes;

export const Default = Template.bind({});
Default.args = {
  label: 'Close',
  disabled: false,
  className: 'iconButton',
  onClick: action('onClick'),
};
Default.parameters = { jest: ['button.test.js'] };
Default.play = async () => {
  await userEvent.click(screen.getByText('Full Width'));
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
  className: 'iconButton',
  onClick: action('onClick'),
};
