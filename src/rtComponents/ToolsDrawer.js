import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';

import useAppContext from '../@RecklessCore/useAppContext';

export default function ToolsDrawer() {
  const { leftMenu, setLeftMenu, bottomMenu } = useAppContext();
  const useStyles = makeStyles((theme) => ({
    drawer: {
      transition: theme.transitions.create('height', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      height: `calc(100% - ${(bottomMenu.open ? bottomMenu.height : 0)}px)`,
      width: leftMenu.width,
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

  const classes = useStyles();
  const theme = useTheme();
  
  const handleDrawerClose = (e) => {
    setLeftMenu({
      ...leftMenu,
      open: false,
    });
  };

  if (!leftMenu.open) return null;

  return (<Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="left"
    open={leftMenu.open}
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