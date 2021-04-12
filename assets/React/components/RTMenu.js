import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';

function Inspector(props) {
  // Deconstruct props from Redux store
  const { isMenuActive } = props;
  
  // Create local classes
  const classes = makeStyles((theme) => ({
    listRoot: {
      width: "250px",
      height: "100%"
    },
    sliderGroupRoot: {
      width: '100%',
    },
    input: {
      width: 42,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      width: '250px'
    },
    footerText: {
      marginRight: '25px',
    }
  }))();

  // Render!
  return (
      <Drawer
        variant="permanent"
        BackdropProps={{ invisible: true }}
        anchor={'right'}
        open={isMenuActive}
      >
        <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <div className={classes.listRoot}>
          <List component="nav" aria-label="inspector">
            <ListItem button component="a" target={"_blank"} href="">
              <ListItemText primary={"View source code"} />
              <GitHubIcon />
          </ListItem>
          </List>
          </div>
        </Toolbar>
      </AppBar>
      </Drawer>
  );
}

function isEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.isMenuActive) === JSON.stringify(nextProps.isMenuActive);
}

export default React.memo(Inspector, isEqual);