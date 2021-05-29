import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';

import useAppContext from '../@RecklessCore/useAppContext';

export default function EditorDrawer() {
  const { bottomMenu, setBottomMenu } = useAppContext();
  
  const useStyles = makeStyles((theme) => ({
    drawer: {
      width: '100%',
      height: bottomMenu.height,
      position: 'fixed',
    },
    drawerPaper: {
      width: '100%',
      height: bottomMenu.height,
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
    setBottomMenu({
      ...bottomMenu,
      open: false,
    });
  };

  if (!bottomMenu.open) return null;

  return (<Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="bottom"
    open={bottomMenu.open}
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
  </Drawer>
  );
}