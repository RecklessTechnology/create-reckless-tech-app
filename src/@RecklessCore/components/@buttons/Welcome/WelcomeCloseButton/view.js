/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../@buttons/IconButton/view';

const EditorCloseButtonView = ({ editorMenuOpen, setEditorMenuOpen }) => (
  <IconButtonView {...{
    label: 'Close',
    handeClick: () => {
      setEditorMenuOpen(!editorMenuOpen);
    },
  }}
  >
    <CloseIcon fontSize="small" />
  </IconButtonView>
);

EditorCloseButtonView.whyDidYouRender = true;

EditorCloseButtonView.propTypes = {
  editorMenuOpen: PropTypes.bool.isRequired,
  setEditorMenuOpen: PropTypes.func.isRequired,
};

export default memo(EditorCloseButtonView);
