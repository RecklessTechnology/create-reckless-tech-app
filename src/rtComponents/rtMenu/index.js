import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import packageJson from './../../../package.json';

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, AppBar, Toolbar, IconButton,
Tabs, Tab, Box, Typography } from "@material-ui/core";
import clsx from 'clsx';

import CancelIcon from '@material-ui/icons/Cancel';
import MenuIcon from '@material-ui/icons/Menu';

import useAppContext from '../../@RecklessCore/useAppContext';

import RTObjectMenu from './RTObjectMenu'

function RTMenu(props) {
  const [RTMenuOpen, setRTMenuOpen] = useState();  
  const { recklessObjectNamesArray } = useAppContext();

  const [currentTab, setCurrentTab] = useState(0);
  
  // Create local classes
  const classes = makeStyles((theme) => ({
    list: {
      width: 250,
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
  return (
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
                <ListItemText primary={`${packageJson.name.replace('_', ' ')}`} className={classes.titleText}/>
              </ListItem>
              <Divider />
              <Tabs
                value={currentTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, newValue) => setCurrentTab(newValue)}
                aria-label="disabled tabs example"
                variant="fullWidth"
              >
                <Tab label="Me" />
                <Tab label="Scene"/>
              </Tabs>
              <div
                role="tabpanel"
                hidden={currentTab !== 0}
                id={`full-width-tabpanel-${0}`}
                aria-labelledby={`full-width-tab-${0}`}
              >
                Item One
              </div>
              <div
                role="tabpanel"
                hidden={currentTab !== 1}
                id={`full-width-tabpanel-${1}`}
                aria-labelledby={`full-width-tab-${1}`}
              >
                {recklessObjectNamesArray().map((name)=>(<div key={name}><RTObjectMenu name={name}/><Divider /></div>))}
              </div>
          </List>
        </div>
        <AppBar position="fixed" className={classes.appBarFooter}>
          <Divider />
          <Toolbar>
            <div className={classes.listRoot}>
              <List component="nav" aria-label="RTMenu">
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
  );
}

export default RTMenu;
