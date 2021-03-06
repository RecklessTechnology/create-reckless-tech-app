/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import '@storybook/jest';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';

import ThemesManager from '../../Themes/Managers/ThemesManager';
import ButtonView from './view';

describe('<ButtonView>', () => {
  const btntxt = 'Test Button';
  test('Content Test', () => {
    // Render component with theme
    const { getByText } = render(
      <ThemesManager theme="Dark">
        <ButtonView>{btntxt}</ButtonView>
      </ThemesManager>,
    );

    // Find button
    const buttonEl = getByText(btntxt);

    // Check if button has text.
    expect(buttonEl).toHaveTextContent(btntxt);
  });

  test('Click Test', () => {
    // Render component with theme
    const { getByText } = render(
      <ThemesManager theme="Dark">
        <ButtonView>{btntxt}</ButtonView>
      </ThemesManager>,
    );

    // Find button
    const buttonEl = getByText(btntxt);

    // Check if onClick is working.
    userEvent.click(buttonEl);
  });

  test('Hover Test', () => {
    // Render component with theme
    const { getByText } = render(
      <ThemesManager theme="Dark">
        <ButtonView>{btntxt}</ButtonView>
      </ThemesManager>,
    );

    // Find button
    const buttonEl = getByText(btntxt);

    // Check if hover is working.
    userEvent.hover(buttonEl);
    userEvent.unhover(buttonEl);
  });
});
