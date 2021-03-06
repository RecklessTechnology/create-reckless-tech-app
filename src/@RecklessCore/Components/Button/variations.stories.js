/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { action } from '@storybook/addon-actions';
import { screen, userEvent } from '@storybook/testing-library';

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import 'typeface-roboto-material';

import ButtonView from './view';

export default {
  title: 'Design System/Button',
  component: ButtonView,
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const ColorsTemplate = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ButtonView {...props} color="primary" id="primary-button">Primary</ButtonView>
      <ButtonView {...props} color="secondary" id="secondary-button">Secondary</ButtonView>
    </div>
  );
};
ColorsTemplate.propTypes = ButtonView.propTypes;

export const Colors = ColorsTemplate.bind({});
Colors.args = { onClick: action('onClick') };
Colors.parameters = { jest: ['button.test.js'] };
Colors.play = async () => {
  await userEvent.click(screen.getByText('Primary'));
  await userEvent.click(screen.getByText('Secondary'));
};

const SizesTemplate = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ButtonView {...props} size="large">Large</ButtonView>
      <ButtonView {...props} size="medium">Medium</ButtonView>
      <ButtonView {...props} size="small">Small</ButtonView>
    </div>
  );
};
SizesTemplate.propTypes = ButtonView.propTypes;

export const Sizes = SizesTemplate.bind({});
Sizes.args = { onClick: action('onClick') };
Sizes.parameters = { jest: ['button.test.js'] };
Sizes.play = async () => {
  await userEvent.click(screen.getByText('Large'));
  await userEvent.click(screen.getByText('Medium'));
  await userEvent.click(screen.getByText('Small'));
};

const IconsTemplate = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ButtonView {...props} startIcon={(<ThumbUpIcon />)}>Start Icon</ButtonView>
      <ButtonView {...props} endIcon={(<ThumbUpIcon />)}>End Icon</ButtonView>
    </div>
  );
};
IconsTemplate.propTypes = ButtonView.propTypes;

export const Icons = IconsTemplate.bind({});
Icons.args = { onClick: action('onClick') };
Icons.parameters = { jest: ['button.test.js'] };
Icons.play = async () => {
  await userEvent.click(screen.getByText('Start Icon'));
  await userEvent.click(screen.getByText('End Icon'));
};

const FullWidthTemplate = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* eslint-disable-next-line react/jsx-boolean-value */}
      <ButtonView {...props} fullWidth>Full Width</ButtonView>
    </div>
  );
};
FullWidthTemplate.propTypes = ButtonView.propTypes;

export const FullWidth = FullWidthTemplate.bind({});
FullWidth.args = { onClick: action('onClick') };
FullWidth.parameters = { jest: ['button.test.js'] };
FullWidth.play = async () => {
  await userEvent.click(screen.getByText('Full Width'));
};
