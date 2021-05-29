import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Drawer, Divider, IconButton, Tabs, Tab, Typography } from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import useAppContext from '../@RecklessCore/useAppContext';

import PeersMenu from './rtMenu/PeersMenu';
import SceneMenu from './rtMenu/SceneMenu';

export default function InspectorDrawer() {
  const { rightMenu, setRightMenu, bottomMenu } = useAppContext();
  
  const classes = makeStyles((theme) => ({
    drawer: {
      transition: theme.transitions.create('height', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      height: `calc(100% - ${(bottomMenu.open ? bottomMenu.height : 0)}px)`,
      width: rightMenu.width,
      position: 'fixed',
      right: 0,
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
  }))();

  const theme = useTheme();

  if (!rightMenu.open) return null;

  return (<Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="right"
    open={rightMenu.open}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.drawerHeader}>
    <Typography>Inspector</Typography>
      <IconButton edge="start" onClick={(e) => {
        setRightMenu({
          ...rightMenu,
          open: false,
        });
      }}>
        {theme.direction !== 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
    <Divider />
    <Tabs
      value={rightMenu.tab}
      indicatorColor="primary"
      textColor="primary"
      onChange={(event, newValue) => setRightMenu({
        ...rightMenu,
        tab: newValue,
      })}
      aria-label="disabled tabs example"
      variant="fullWidth"
    >
      <Tab label="Room" />
      <Tab label="Scene"/>
    </Tabs>
    {rightMenu.tab === 0 ? <PeersMenu/> : null}
    {rightMenu.tab === 1 ? <SceneMenu/> : null}
  </Drawer>
  );
}