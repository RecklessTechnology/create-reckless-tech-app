import React, { createContext, useState, useMemo, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography, IconButton, Fab } from "@material-ui/core";

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
// import CreateIcon from '@material-ui/icons/Create';
// import AddIcon from "@material-ui/icons/Add";

import createPubSub from './@RecklessCore/utils/createPubSub';

import ConnectionsManager from './@RecklessCore/connections/ConnectionsManager';
import World from './@RecklessCore/World';
import SceneManager from './@RecklessCore/SceneManager';
import Scene from './@RecklessCore/Scene';

import DynamicScene from './scenes/DynamicScene';

import DefaultSceneJSON from './scenes/LogoScene';
import DefaultSceneJSONClient from './scenes/TestScene'
// import RTMenu from './rtComponents/rtMenu';

// import ToolsDrawer from './rtComponents/ToolsDrawer'
import InspectorDrawer from './rtComponents/InspectorDrawer'
// import EditorDrawer from './rtComponents/EditorDrawer'

// import NodeEditor from './rtComponents/Graph';

export const ConnectionsContext = createContext(null);
export const AppContext = createContext(null);

const App = ({
  movementDuration = 250,
  cameraZoom = 64,
}) => {
  const [leftMenu, setLeftMenu] = useState({
    width: 250,
    open: false,
    tab: 0,
  });
  const [rightMenu, setRightMenu] = useState({
    width: 300,
    open: true,
    tab: 0,
  });
  const [bottomMenu, setBottomMenu] = useState({
    height: 250,
    open: false,
    tab: 0,
  });
  
  const [sceneJSON, setSceneJSON] = useState(window.location.hash.substr(1) === '' ? DefaultSceneJSON : DefaultSceneJSONClient);
  const [paused, setPaused] = useState(false);
  const [registryById] = useState(() => new Map());
  const [registryByName] = useState(() => new Map());
  const [registryByPos] = useState(() => new Map());
  const [registryByType] = useState(() => new Map());

  const [pubSub] = useState(() => createPubSub());
  
  useEffect(() => {
      return pubSub.subscribe('scene-exit', () => {
          registryById.clear();
          registryByName.clear();
          registryByPos.clear();
          registryByType.clear();
      });
  }, [pubSub, registryById, registryByType, registryByName, registryByPos]);

  // Peer Connections
  const [registryPeerById] = useState(() => new Map());
  const [ me, setMe ] = useState({id:0});
  const [ room, setRoom ] = useState(null);
  const [ roomId, setRoomId ] = useState(null);
  const [ connectionType ] = useState(window.location.hash.substr(1) === '' ? 'server' : 'client');

  const peerRegistryUtils = useMemo(
    () => ({
        findPeerById(id) {
          return registryPeerById.get(id);
        },
        registerPeer(identifier, ref) {
            console.log('register', identifier, ref);
            // register by id
            registryPeerById.set(identifier, ref);

            if (ref.isMe === true) {
              setMe(ref);
            }

            pubSub.publish('peers-list-changed', 'add');

        },
        unregisterPeer(identifier, ref) {
            console.log('unregister', identifier, ref);
            // unregister by id
            registryPeerById.delete(identifier);
            pubSub.publish('peers-list-changed', 'remove');
        },
        getPeersArray() {
          return Array.from(registryPeerById.keys()).map((id)=>registryPeerById.get(id));
        },
    }),
    [registryPeerById]
  );

  const connectionsContextValue = useMemo(() => ({
    connectionType,
    me, setMe,
    room, setRoom,
    roomId, setRoomId,
    registryPeerById,
    ...peerRegistryUtils,
  }), [
    connectionType,
    me, setMe,
    room, setRoom,
    roomId, setRoomId,
    registryPeerById,
    peerRegistryUtils,
  ]);

  const objectRegistryUtils = useMemo(
    () => ({
        registerRecklessObject(identifier, ref) {
            // register by id
            registryById.set(identifier, ref);
            // register by name
            registryByName.set(ref.name, ref);
            // register by position
            const { position } = ref;
            const pos = `${position.x},${position.y},${position.z}`;
            const posList = registryByPos.get(pos) || [];
            posList.push(ref);
            registryByPos.set(pos, posList);
        },
        unregisterRecklessObject(identifier, ref) {
            // unregister by id
            registryById.delete(identifier);
            // unregister by name
            registryByName.delete(ref.name);
            // unregister by position
            const { position } = ref;
            const pos = `${position.x},${position.y},${position.z}`;
            const posList = registryByPos.get(pos);
            posList.splice(posList.indexOf(ref), 1);
        },
        findRecklessObjectById(id) {
            return registryById.get(id);
        },
        findRecklessObjectByName(name) {
            return registryByName.get(name);
        },
        findRecklessObjectsByPos(x, y) {
            return registryByPos.get(`${x},${y}`)?.filter(obj => !obj.disabled) || [];
        },
        findRecklessObjectsByLayer(type) {
            return registryByType.get(type)?.filter(obj => !obj.disabled) || [];
        },
        recklessObjectNamesArray() {
          return Array.from(registryByName.keys());
        }
    }),
    [registryById, registryByType, registryByName, registryByPos]
  );

  const appContextValue = useMemo(() => ({
    settings: {
        movementDuration,
        cameraZoom,
    },
    leftMenu, setLeftMenu,
    rightMenu, setRightMenu,
    bottomMenu, setBottomMenu,
    paused,
    setPaused,
    registryByName,
    sceneJSON, setSceneJSON,
    ...objectRegistryUtils,
    ...pubSub,
  }), [
    leftMenu, setLeftMenu,
    rightMenu, setRightMenu,
    bottomMenu, setBottomMenu,
    movementDuration, cameraZoom,
    paused, setPaused,
    sceneJSON, setSceneJSON,
    registryByName,
    objectRegistryUtils, pubSub]);

  const theme = useTheme();

  // Local CSS classes
  const classes = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: '100%',
      overflow: 'scroll',
    },
    rootShiftBottom: {
      height: `calc(100% - ${(bottomMenu.open ? bottomMenu.height : 0)}px)`,
      transition: theme.transitions.create('height', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appBar: {
      width: `calc(100% - ${(leftMenu.open ? leftMenu.width : 0) + (rightMenu.open ? rightMenu.width : 0)}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      background: 'none',
      boxShadow: 'none',
    },
    appBarShiftLeft: {
      marginLeft: leftMenu.width,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appBarShiftRight: {
      marginRight: rightMenu.width,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    renderArea: {
      flexGrow: 1,
      // paddingTop: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
      marginRight: 0,
      height: '100%',
    },
    renderAreaShiftLeft: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: leftMenu.width,
    },
    renderAreaShiftRight: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: rightMenu.width,
    },
    bottomAppBar: {
      width: `calc(100% - ${(leftMenu.open ? leftMenu.width : 0) + (rightMenu.open ? rightMenu.width : 0)}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      top: 'auto',
      bottom: bottomMenu.open ?  bottomMenu.height : 0,
      background: 'none',
      boxShadow: 'none',
    },
    bottomToolbar: {
      width: '100%'
    },
    inspectorButton: {
      marginLeft: 'auto',
    }
  }))();

  return(
    <div
      className={clsx(classes.root, {
        [classes.rootShiftBottom]: bottomMenu.open,
      })}
    >
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShiftLeft]: leftMenu.open,
          [classes.appBarShiftRight]: rightMenu.open,
        })}
      >
        <Toolbar>
          {/* <Typography variant="h6" noWrap>
            Reckless Tech
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>{setBottomMenu({
              ...bottomMenu,
              open: !bottomMenu.open,
            })}}
            edge="end"
            className={classes.menuButton}
          >
            <CreateIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      {/* <AppContext.Provider value={appContextValue}><ToolsDrawer/></AppContext.Provider> */}
      <main
        className={clsx(classes.renderArea, {
          [classes.renderAreaShiftLeft]: leftMenu.open,
          [classes.renderAreaShiftRight]: rightMenu.open,
        })}
      >
        <World sceneJSON={appContextValue.sceneJSON}>
          <AppContext.Provider value={appContextValue}>
            <ConnectionsContext.Provider value={connectionsContextValue}>
            <ConnectionsManager>
              <SceneManager defaultScene="dynamic">
                <Scene id="dynamic">
                  <DynamicScene/>
                </Scene>
              </SceneManager>
            </ConnectionsManager>
            </ConnectionsContext.Provider>
          </AppContext.Provider>
        </World>
        <AppBar position="fixed" color="primary" className={clsx(classes.bottomAppBar, {
          [classes.appBarShiftLeft]: leftMenu.open,
          [classes.appBarShiftRight]: rightMenu.open,
        })}>
        <Toolbar className={classes.bottomToolbar}>
          {/* <IconButton
            color="inherit"
            aria-label="open add element"
            onClick={()=>setLeftMenu({
              ...leftMenu,
              open: !leftMenu.open,
            })}
            edge="start"
            className={classes.menuButton}
          >
            <AddIcon />
          </IconButton> */}
          <IconButton
            color="inherit"
            aria-label="open add element"
            onClick={()=>setRightMenu({
              ...rightMenu,
              open: !rightMenu.open,
            })}
            edge="end"
            className={classes.inspectorButton}
          >
            <InfoOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      </main>
      <AppContext.Provider value={appContextValue}>
        <ConnectionsContext.Provider value={connectionsContextValue}>
          <InspectorDrawer/>
        </ConnectionsContext.Provider>
      </AppContext.Provider>
      {/* <AppContext.Provider value={appContextValue}><EditorDrawer/></AppContext.Provider> */}
    </div>
  )
}

export default App;
