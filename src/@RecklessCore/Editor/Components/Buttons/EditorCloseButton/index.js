import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../../../Components/Buttons/IconButton/view';

import useEditorMenuContext from '../../../Contexts/useEditorMenuContext';

const useStyles = makeStyles(() => ({
  button: {},
}));

const EditorCloseButton = () => {
  const classes = useStyles();
  const { editorMenuOpen, setEditorMenuOpen } = useEditorMenuContext();

  return (
    <IconButtonView
      {...{
        label: 'Close',
        handeClick: () => {
          setEditorMenuOpen(!editorMenuOpen);
        },
      }}
      className={classes.button}
      disabled={false}
    >
      <CloseIcon fontSize="small" />
    </IconButtonView>
  );
};

EditorCloseButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(EditorCloseButton);
