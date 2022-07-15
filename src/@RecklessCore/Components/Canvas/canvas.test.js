import '@storybook/jest';

import {
  describe,
  render,
  test,
} from '@testing-library/react';

import React from 'react';

import ThemesManager from '../../Themes/Managers/ThemesManager';
import CanvasView from './view';

describe('<CanvasView>', () => {
  test('Content Loads', () => {
    // Render component with theme
    render(
      <ThemesManager theme="Default">
        <CanvasView {...{
          width: 500,
          height: 500,
        }}
        />
      </ThemesManager>,
    );
  });
});
