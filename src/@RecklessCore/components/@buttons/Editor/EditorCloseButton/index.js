/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../IconButton/view';

import useEditorMenuContext from '../../../../contexts/useEditorMenuContext';

const EditorCloseButton = () => {
  const { editorMenuOpen, setEditorMenuOpen } = useEditorMenuContext();

  return (
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
};

EditorCloseButton.whyDidYouRender = true;

export default EditorCloseButton;
