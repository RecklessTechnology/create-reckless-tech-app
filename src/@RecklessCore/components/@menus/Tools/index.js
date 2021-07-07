import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';

import useToolsMenuContext from '../../../contexts/useToolsMenuContext';
import useEditorMenuContext from '../../../contexts/useEditorMenuContext';

const useStyles = makeStyles((theme) => ({
  drawer: {
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: (props)=>(`calc(100% - ${(props.editorMenuOpen ? props.editorMenuHeight : 0)}px)`),
    width: (props)=>(props.toolsMenuWidth),
    position: 'fixed',
    left: 0,
    top: 0,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

export default function ToolsDrawer() {
  const { toolsMenuWidth, toolsMenuOpen, setToolsMenuOpen } = useToolsMenuContext();
  const { editorMenuOpen, editorMenuHeight } = useEditorMenuContext();

  const classes = useStyles({ toolsMenuWidth, editorMenuOpen, editorMenuHeight });
  const theme = useTheme();
  
  const handleDrawerClose = (e) => {
    setToolsMenuOpen(false);
  };

  if (!toolsMenuOpen) return null;

  return (<Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="left"
    open={toolsMenuOpen}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.drawerHeader}>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
    <Divider />
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Drawer>
  );
}