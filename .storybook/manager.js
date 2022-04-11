import React from 'react';

import { addons } from '@storybook/addons';
import theme from '../src/stories/theme';

addons.setConfig({
  theme: theme,
  panelPosition: 'right',
  isToolshown: true,
  sidebar: {
    collapsedRoots: ['devices', 'mediaplayers', 'transforms', '3d-objects', 'generators', 'components', 'pure-components'],
  },
});