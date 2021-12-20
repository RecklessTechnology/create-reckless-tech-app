import PropTypes from 'prop-types';

import React from 'react';

import WelcomeToolbarView from './view';

const WelcomeToolbar = ({ handleClose }) => <WelcomeToolbarView {...{ handleClose }} />;

WelcomeToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

WelcomeToolbar.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default WelcomeToolbar;
