import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import IconButtonView from '../../../../Components/IconButton/view';

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
        onClick: () => {
          setEditorMenuOpen(!editorMenuOpen);
        },
      }}
      className={classes.button}
      disabled={false}
    >
      <ExpandMoreIcon fontSize="small" />
    </IconButtonView>
  );
};

EditorCloseButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(EditorCloseButton);
