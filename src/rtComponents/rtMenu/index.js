import React, { createContext, useState, useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import packageJson from './../../../package.json';

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, AppBar, Toolbar, IconButton,
Tabs, Tab } from "@material-ui/core";
import clsx from 'clsx';

import CancelIcon from '@material-ui/icons/Cancel';
import MenuIcon from '@material-ui/icons/Menu';

import PeersMenu from './PeersMenu';
import SceneMenu from './SceneMenu';

export const RTMenuContext = createContext(null);

function RTMenu(props) {
  const [RTMenuOpen, setRTMenuOpen] = useState(false);
  const [RTMenuTab, setRTMenuTab] = useState(0);
  
  // Create local classes
  const classes = makeStyles((theme) => ({
    list: {
      width: 500,
    },
    fullList: {
      width: 'auto',
    },
    listRoot: {
      width: "250px",
      height: "100%"
    },
    appBarFooter: {
      top: 'auto',
      bottom: 0,
      width: '250px',
      background: 'none',
    },
    footerText: {
      marginRight: '25px',
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      background: 'none',
      boxShadow: 'none',
    },
    grow: {
      flexGrow: 1,
    },
    titleText: {
      textTransform: 'capitalize',
    },
    rtText: {
      textAlign: 'right',
    }
  }))();

  const contextValue = useMemo(()=>({
    RTMenuOpen, setRTMenuOpen,
    RTMenuTab, setRTMenuTab,
  }), [RTMenuOpen, setRTMenuOpen, RTMenuTab, setRTMenuTab]);


  return (
    <RTMenuContext.Provider value={contextValue}>
      <div>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
            <div className={classes.grow} />
            <IconButton onClick={()=> setRTMenuOpen(true)} edge="end" color="inherit">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          BackdropProps={{ invisible: true }}
          anchor={'right'}
          open={RTMenuOpen}
        >
          <div
            className={clsx(classes.list)}
            role="presentation"
          >
            <List>
                <ListItem key={'Close'} onClick={() => { setRTMenuOpen(false) }}>
                  <ListItemIcon><CancelIcon /></ListItemIcon>
                </ListItem>
                <Divider />
                <Tabs
                  value={RTMenuTab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={(event, newValue) => setRTMenuTab(newValue)}
                  aria-label="disabled tabs example"
                  variant="fullWidth"
                >
                  <Tab label="Peers" />
                  <Tab label="Scene"/>
                </Tabs>
                {RTMenuTab === 0 ? <PeersMenu/> : null}
                {RTMenuTab === 1 ? <SceneMenu/> : null}
            </List>
          </div>
          <AppBar position="fixed" className={classes.appBarFooter}>
            <Divider />
            <Toolbar>
              <div className={classes.listRoot}>
                <List component="nav" aria-label="RTMenu">
                  <ListItem>
                    <ListItemText primary={`${packageJson.name.replace('_', ' ')}`} className={classes.titleText}/>
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary={`built with`} className={classes.rtText}/>
                  </ListItem>
                  <ListItem button component="a" target={"_blank"} href="https://github.com/RecklessTechnology/create-reckless-tech-app">
                    <ListItemText primary={"Reckless Technology"} secondary={`v${packageJson.version}`} className={classes.rtText}/>
                  </ListItem>
                </List>
              </div>
            </Toolbar>
          </AppBar>
        </Drawer>
      </div>
    </RTMenuContext.Provider>
  );
}

export default RTMenu;
