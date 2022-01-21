import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography, List, ListItem, Link,
} from '@material-ui/core';

import BasicModal from '../../../Components/Modals/Basic';

const useStyles = makeStyles(() => ({
  listRoot: {
    width: '100%',
  },
  listItem: {
    width: '100%',
  },
  title: {},
}));

const WelcomeModal = () => {
  const classes = useStyles();
  return (
    <BasicModal>
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
    </BasicModal>
  );
};

WelcomeModal.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(WelcomeModal);
