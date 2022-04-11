import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../../App/Managers/AppManager';
import MediaPlayersManager from '../../Managers/MediaPlayersManager';
import WidgetsManager from '../../../Widgets/Managers/WidgetsManager';
import WidgetManager, { DefaultProps as DefaultWidgetProps } from '../../../Widgets/Managers/WidgetManager';

import Component from './index';
import Provider from '../../Providers';
import DefaultTrackList from '../../Providers/MusicPlayer/DefaultTrackList';

import theme from '../../../../theme';

export default {
  title: 'MediaPlayers/Music/Widget',
  component: Component.type,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager>
          <MediaPlayersManager>
            <WidgetsManager>
              <Story />
            </WidgetsManager>
          </MediaPlayersManager>
        </AppManager>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    data: { table: { disable: true }, control: { disable: true } },
  },
};

const Template = ({ uuid, type, ...props }) => (
  <div style={{
    position: 'relative',
    width: '100%',
    minHeight: '500px',
  }}
  >
    <Provider
      players={[
        {
          uuid: 'yyy',
          type: 'musicPlayer',
          name: 'Music Player',
          isPlaying: false,
          trackProgress: 0,
          trackIndex: 0,
          tracks: DefaultTrackList,
        },
      ]}
    />
    <WidgetManager {...DefaultWidgetProps} {...props}>
      <Component
        uuid={uuid}
        type={type}
        {...{ props }}
        connection={{
          uuid: 'zzz',
          from: 'yyy',
          fromProp: 'audio',
          to: 'xxx',
          toProp: 'audio',
        }}
      />
    </WidgetManager>
  </div>
);

Template.propTypes = Component.propTypes;

export const Small = Template.bind({});
Small.args = {
  uuid: 'xxx',
  type: 'musicControls',
  name: 'Music Controls',
  size: 0,
  location: 0,
  userData: {
    isPatchHidden: false,
  },
};

export const Medium = Template.bind({});
Medium.args = {
  uuid: 'xxx',
  type: 'musicControls',
  name: 'Music Controls',
  size: 1,
  location: 0,
  userData: {
    isPatchHidden: false,
  },
};

export const Large = Template.bind({});
Large.args = {
  uuid: 'xxx',
  type: 'musicControls',
  name: 'Music Controls',
  size: 2,
  location: 0,
  userData: {
    isPatchHidden: false,
  },
};
