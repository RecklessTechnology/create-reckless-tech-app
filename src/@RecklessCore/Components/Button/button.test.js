import '@storybook/jest';

import {
  describe,
  render,
  test,
} from '@testing-library/react';

import React from 'react';

import ThemesManager from '../../Themes/Managers/ThemesManager';
import ButtonView from './view';

describe('<ButtonView>', () => {
  test('Content Loads', () => {
    // Render component with theme
    render(
      <ThemesManager theme="Default">
        <ButtonView {...{
          size: 'large',
          color: 'primary',
          variant: 'contained',
        }}
        />
      </ThemesManager>,
    );
  });
});
