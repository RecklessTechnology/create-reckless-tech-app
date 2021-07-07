import { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Drawer, Divider, Tabs, Tab } from '@material-ui/core'

import RoomMenu from '../../RoomMenu';
import PeersMenu from '../../PeersMenu';
// import SceneMenu from '../../SceneMenu';
import InspectorToolbar from '../../InspectorToolbar';

const useStyles = makeStyles((theme) => ({
  drawer: {
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: (props)=>(`calc(100% - ${(props.editorMenuOpen ? props.editorMenuHeight : 0)}px)`),
    width: (props)=>(props.inspectorMenuWidth),
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1300,
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

const InspectorView = ({
  editorMenuOpen,
  editorMenuHeight,
  inspectorMenuWidth,
  inspectorMenuOpen,
  setInspectorMenuOpen,
  inspectorMenuTab,
  setInspectorMenuTab
}) => {
  
  const classes = useStyles({
    editorMenuOpen,
    editorMenuHeight,
    inspectorMenuWidth,
  });

  return (<Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="right"
    open={inspectorMenuOpen}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <InspectorToolbar />
    <Divider />
    <Tabs
      value={inspectorMenuTab}
      indicatorColor="primary"
      textColor="primary"
      onChange={(event, newValue) => setInspectorMenuTab(newValue)}
      aria-label="disabled tabs example"
      variant="fullWidth"
    >
      <Tab label="Room" />
      <Tab label="Peers"/>
      {/* <Tab label="Scene"/> */}
    </Tabs>
    {inspectorMenuTab === 0 ? <RoomMenu/> : null}
    {inspectorMenuTab === 1 ? <PeersMenu/> : null}
    {/* {inspectorMenuTab === 1 ? <SceneMenu/> : null} */}
  </Drawer>
  );
}

InspectorView.whyDidYouRender = true

export default memo(InspectorView);