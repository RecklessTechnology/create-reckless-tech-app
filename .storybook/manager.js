import React from 'react';

import { addons } from '@storybook/addons';
import theme from '../src/stories/theme';

addons.setConfig({
  theme: theme,
  panelPosition: 'right',
  isToolshown: false,
  sidebar: {
    collapsedRoots: ['buttons', 'menus', 'modals', 'toolbars', 'pure-components'],
  },
});