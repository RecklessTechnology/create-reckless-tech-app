/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar, Typography, List, ListItem, Divider, Paper, Link,
} from '@material-ui/core';
import WelcomeToolbar from './WelcomeToolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '375px',
  },
  listRoot: {
    width: '100%',
  },
  listItem: {
    width: '100%',
  },
  title: {},
}));

const WelcomeModalView = (props, ref) => {
  const {
    closeMenu, value, handleChange, handleClose,
  } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <WelcomeToolbar {...{ handleClose }} />
      <Divider />
      <List
        dense
        className={classes.listRoot}
      >
        <ListItem className={classes.listItem}>
          <Typography variant="body2">
            Welcome to the Proof of Concept demo of Reckless Techology:
            a free and open source progressive web app that allows artists and performers
            to quickly connect and collaborate in real-time.
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Typography variant="body2">
            This project was created with 3 basic goals in mind:
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ul>
            <li>
              <Typography variant="body2">
                Quickly find and connect to peers.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Easily contribute live data to a project.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Experiment quickly and in real-time.
              </Typography>
            </li>
          </ul>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Typography variant="body2">
            Check out
            <Link target="_blank" href="https://github.com/RecklessTechnology/create-reckless-tech-app/wiki">
              &nbsp;the wiki&nbsp;
            </Link>
            for more information.
          </Typography>
        </ListItem>
      </List>
    </Paper>
  );
};

export default memo(forwardRef(WelcomeModalView));
