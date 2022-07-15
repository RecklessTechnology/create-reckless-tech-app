import '@storybook/jest';

import {
  describe,
  render,
  test,
} from '@testing-library/react';

import React from 'react';

import ThemesManager from '../../Themes/Managers/ThemesManager';
import AvatarView from './view';

describe('<AvatarView>', () => {
  test('Content Loads', () => {
    // Render component with theme
    render(
      <ThemesManager theme="Default">
        <AvatarView {...{
          size: 'large',
          username: 'Jerknose',
          src: 'https://avatars.githubusercontent.com/u/6080018?v=4',
        }}
        />
      </ThemesManager>,
    );
  });
});
