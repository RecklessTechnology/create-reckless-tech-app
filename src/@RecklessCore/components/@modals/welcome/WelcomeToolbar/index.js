/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import WelcomeToolbarView from './view';

const WelcomeToolbar = ({ handleClose }) => <WelcomeToolbarView {...{ handleClose }} />;

WelcomeToolbar.whyDidYouRender = true;

export default WelcomeToolbar;
