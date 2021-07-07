import { makeStyles } from '@material-ui/core/styles';

import { Drawer, Divider } from '@material-ui/core'

import NodeEditor from '../../NodeEditor/index';
import EditorToolbar from '../../EditorToolbar/index';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '100%',
    height: (props) => props.editorMenuHeight,
    position: 'fixed',
  },
  drawerPaper: {
    width: '100%',
    height: (props) => props.editorMenuHeight,
  },
}));  

const EditorView = ({ editorMenuOpen, editorMenuHeight, setEditorMenuOpen}) => {
  const classes = useStyles({ editorMenuOpen, editorMenuHeight, setEditorMenuOpen});
  
  return <Drawer
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
  </Drawer>;
}

EditorView.whyDidYouRender = true;

export default EditorView;