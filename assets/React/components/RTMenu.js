import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { makeStyles } from '@material-ui/core/styles';

import rtPackageJson from './../rt_package.json';
import packageJson from './../../package.json';

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, AppBar, Toolbar, IconButton } from "@material-ui/core";
import clsx from 'clsx';

import CancelIcon from '@material-ui/icons/Cancel';
import MenuIcon from '@material-ui/icons/Menu';

import { clearMenuActive, updateMenuActive } from './../actions/rt_menu';

function RTMenu(props) {
  // Deconstruct props from Redux store
  const { isMenuActive, clearMenuActive, updateMenuActive } = props;
  
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
          <IconButton onClick={()=> updateMenuActive(true)} edge="end" color="inherit">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        BackdropProps={{ invisible: true }}
        anchor={'right'}
        open={isMenuActive}
      >
        <div
          className={clsx(classes.list)}
          role="presentation"
        >
          <List>
              <ListItem key={'Close'} onClick={clearMenuActive}>
                <ListItemIcon><CancelIcon /></ListItemIcon>
                <ListItemText primary={`${packageJson.name.replace('_', ' ')}`} className={classes.titleText}/>
              </ListItem>
              <Divider />
          </List>
        </div>
        <AppBar position="fixed" className={classes.appBarFooter}>
          <Divider />
          <Toolbar>
            <div className={classes.listRoot}>
              <List component="nav" aria-label="RTMenu">
                <ListItem button component="a" target={"_blank"} href="">
                  <ListItemText secondary={`built with`} className={classes.rtText}/>
                  <ListItemText primary={"Reckless Technology"} secondary={`v${rtPackageJson.version}`} className={classes.rtText}/>
                </ListItem>
              </List>
            </div>
          </Toolbar>
        </AppBar>
      </Drawer>
    </div>
  );
}

const mapStateToProps = state => {
  return ({
    isMenuActive: state.rt_menu.active,
  })
}

 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateMenuActive: updateMenuActive,
    clearMenuActive: clearMenuActive,
  }, dispatch);
}

function isEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.isMenuActive) === JSON.stringify(nextProps.isMenuActive);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(RTMenu, isEqual));
