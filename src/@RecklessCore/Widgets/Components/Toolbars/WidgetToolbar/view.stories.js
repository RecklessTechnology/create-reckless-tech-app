import React, { useState } from 'react';

import 'typeface-roboto-material';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import AppManager from '../../../../App/Managers/AppManager';

import WidgetToolbarView from './view';

import theme from '../../../../../theme';

export default {
  title: 'Components/Toolbars/Widget Toolbar',
  component: WidgetToolbarView.type,
  argTypes: { handleChange: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppManager>
          <Story />
        </AppManager>
      </ThemeProvider>
    ),
  ],
};

const Template = ({
  size,
  location, handleLocationChange,
}) => {
  const [localSize, setLocalSize] = useState(size);
  const onChange = (val) => {
    setLocalSize(val);
  };
  return (
    <WidgetToolbarView
      {...{
        size: localSize,
        handleSizeChange: onChange,
        location,
        handleLocationChange,
      }}
    />
  );
};

Template.propTypes = WidgetToolbarView.propTypes;

export const Small = Template.bind({});
Small.args = {
  size: 0,
  handleSizeChange: () => {},
  location: 0,
  handleLocationChange: () => {},
};

export const Medium = Template.bind({});
Medium.args = {
  size: 1,
  handleSizeChange: () => {},
  location: 0,
  handleLocationChange: () => {},
};

export const Large = Template.bind({});
Large.args = {
  size: 2,
  handleSizeChange: () => {},
  location: 0,
  handleLocationChange: () => {},
};
