/* eslint-disable no-console */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import 'typeface-roboto-material';

import AvatarView from './view';

import ThemesManager from '../../Themes/Managers/ThemesManager';

export default {
  title: 'Design System/Avatar',
  component: AvatarView,
  decorators: [
    (Story, { globals }) => {
      const { theme } = globals;
      return (<ThemesManager theme={theme}><Story /></ThemesManager>);
    },
  ],
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const SizesTemplate = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AvatarView {...props} size="large" />
      <AvatarView {...props} size="medium" />
      <AvatarView {...props} size="small" />
    </div>
  );
};
SizesTemplate.propTypes = AvatarView.propTypes;

export const Sizes = SizesTemplate.bind({});

Sizes.args = {
  username: 'Jerknose',
  src: 'https://avatars.githubusercontent.com/u/6080018?v=4',
};

const InitialsTemplate = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AvatarView {...props} size="large" username="Jerknose" />
      <AvatarView {...props} size="medium" username="User 2" />
      <AvatarView {...props} size="small" username="Made Up Person" />
    </div>
  );
};

InitialsTemplate.propTypes = AvatarView.propTypes;

export const Initials = InitialsTemplate.bind({});

Initials.args = {
  src: null,
};

const LoadingTemplate = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AvatarView {...props} size="large" username="Jerknose" />
      <AvatarView {...props} size="medium" username="User 2" />
      <AvatarView {...props} size="small" username="Made Up Person" />
    </div>
  );
};

LoadingTemplate.propTypes = AvatarView.propTypes;

export const Loading = LoadingTemplate.bind({});

Loading.args = {
  loading: true,
};

const VariantsTemplate = (props, { globals }) => {
  const classes = useStyles();
  const { theme } = globals;
  return (
    <ThemesManager theme={theme}>
      <div className={classes.root}>
        <AvatarView {...props} variant="circular" size="large" />
        <AvatarView {...props} variant="rounded" size="large" />
        <AvatarView {...props} variant="square" size="large" />
      </div>
    </ThemesManager>
  );
};
VariantsTemplate.propTypes = AvatarView.propTypes;

export const Variants = VariantsTemplate.bind({});

Variants.args = {
  username: 'Jerknose',
  src: 'https://avatars.githubusercontent.com/u/6080018?v=4',
};
