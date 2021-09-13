/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Drawer, Divider } from '@material-ui/core';

import NodeEditor from '../../NodeEditor';
import EditorToolbar from './EditorToolbar';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: (props) => props.editorMenuHeight,
    position: 'fixed',
  },
  paper: {
    width: '100%',
    height: (props) => props.editorMenuHeight,
  },
}));

const EditorView = ({ editorMenuOpen, editorMenuHeight, setEditorMenuOpen }) => {
  const classes = useStyles({ editorMenuOpen, editorMenuHeight, setEditorMenuOpen });

  return (
    <Drawer
      variant="persistent"
      anchor="bottom"
      open={editorMenuOpen}
      classes={{
        root: classes.root,
        paper: classes.paper,
      }}
    >
      <EditorToolbar />
      <Divider />
      <NodeEditor />
    </Drawer>
  );
};

EditorView.propTypes = {
  editorMenuOpen: PropTypes.bool.isRequired,
  editorMenuHeight: PropTypes.number.isRequired,
  setEditorMenuOpen: PropTypes.func.isRequired,
};

EditorView.whyDidYouRender = true;

export default EditorView;
