import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Drawer, Divider } from '@material-ui/core';

import NodeEditor from './Components/NodeEditor';
import EditorToolbar from './Components/Toolbars/EditorToolbar';

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

const EditorMenuView = ({ editorMenuOpen, editorMenuHeight, setEditorMenuOpen }) => {
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

EditorMenuView.propTypes = {
  editorMenuOpen: PropTypes.bool.isRequired,
  editorMenuHeight: PropTypes.number.isRequired,
  setEditorMenuOpen: PropTypes.func.isRequired,
};

EditorMenuView.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(EditorMenuView);
