import PropTypes from 'prop-types';

import React from 'react';

import ModalToolbarView from './view';

const ModalToolbar = ({ handleClose }) => <ModalToolbarView {...{ handleClose }} />;

ModalToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

ModalToolbar.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ModalToolbar;
