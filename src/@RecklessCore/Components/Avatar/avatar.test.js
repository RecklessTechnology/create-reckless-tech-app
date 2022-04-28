/* eslint-disable no-undef */

import '@storybook/jest';

import {
  render,
} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import React from 'react';

import ThemesManager from '../../Themes/Managers/ThemesManager';
import AvatarView from './view';

describe('<AvatarView>', () => {
  test('Content Test', () => {
    const btntxt = 'Test Button';

    // Render component with theme
    const { container } = render(
      <ThemesManager theme="Dark">
        <AvatarView {...{
          size: 'large',
          username: 'Jerknose',
          src: 'https://avatars.githubusercontent.com/u/6080018?v=4',
        }}
        />
      </ThemesManager>,
    );

    // Find button
    // const buttonEl = getByText(btntxt);

    // expect(container.firstChild).toMatchInlineSnapshot(`
    //   <h1>Hello, World!</h1>
    // `);

    // Check if button has text.
    // expect(buttonEl).toHaveTextContent(btntxt);
  });
});
