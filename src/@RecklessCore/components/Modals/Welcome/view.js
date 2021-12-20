import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography, List, ListItem, Divider, Paper, Link,
} from '@material-ui/core';
import WelcomeToolbar from './WelcomeToolbar';

const useStyles = makeStyles(() => ({
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

const WelcomeModalView = (props) => {
  const {
    handleClose,
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

WelcomeModalView.whyDidYouRender = (process.env.NODE_ENV === 'development');

WelcomeModalView.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default memo(WelcomeModalView);
