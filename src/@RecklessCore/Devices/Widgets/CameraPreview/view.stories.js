import React from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../../App/Managers/AppManager';
import DevicesManager from '../../Managers/DevicesManager';
import WidgetsManager from '../../../Widgets/Managers/WidgetsManager';
import WidgetManager, { DefaultProps as DefaultWidgetProps } from '../../../Widgets/Managers/WidgetManager';

import Component from './index';
import Provider from '../../Providers';

import theme from '../../../../theme';

export default {
  title: 'Devices/Camera/Widget',
  component: Component.type,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager>
          <DevicesManager>
            <WidgetsManager>
              <Story />
            </WidgetsManager>
          </DevicesManager>
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
    minHeight: '500px',
  }}
  >
    <Provider
      devices={[
        {
          uuid: 'yyy',
          type: 'camera',
          name: 'Default Camera',
          userData: {
            isPatchHidden: false,
          },
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
          fromProp: 'mediastream',
          to: 'xxx',
          toProp: 'mediastream',
        }}
      />
    </WidgetManager>
  </div>
);

Template.propTypes = Component.propTypes;

export const Small = Template.bind({});
Small.args = {
  uuid: 'xxx',
  type: 'preview',
  name: 'new preview',
  userData: {
    isPatchHidden: false,
  },
  size: 0,
  location: 0,
};

export const Medium = Template.bind({});
Medium.args = {
  uuid: 'xxx',
  type: 'preview',
  name: 'new preview',
  userData: {
    isPatchHidden: false,
  },
  size: 1,
  location: 0,
};

export const Large = Template.bind({});
Large.args = {
  uuid: 'xxx',
  type: 'preview',
  name: 'new preview',
  userData: {
    isPatchHidden: false,
  },
  size: 2,
  location: 0,
};
