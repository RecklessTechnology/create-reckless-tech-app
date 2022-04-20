import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Drawer, Divider } from '@material-ui/core';

import NodeEditor from './Components/NodeEditor';
import EditorToolbar from './Components/Toolbars/EditorToolbar';

const useStyles = makeStyles((theme) => ({
  drawer: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: '100%',
    height: (props) => props.editorMenuHeight,
    // height: (props) => (`calc(100% - ${(props.editorMenuOpen ? props.editorMenuHeight : 0)}px)`),
    // width: (props) => (props.inspectorMenuWidth),
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1300,
    pointerEvents: 'all',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
}));

const EditorMenuView = ({ editorMenuOpen, editorMenuHeight, setEditorMenuOpen }) => {
  const classes = useStyles({ editorMenuOpen, editorMenuHeight, setEditorMenuOpen });

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="bottom"
      open={editorMenuOpen}
      classes={{
        paper: classes.drawerPaper,
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
