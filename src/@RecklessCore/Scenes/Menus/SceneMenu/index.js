import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  List, ListItem,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 0,
  },
  listRoot: {
    display: 'block',
    width: '100%',
    paddingTop: 0,
  },
  listItem: {
    width: '100%',
  },
  itemText: {
    color: '#fff',
  },
}));

const SceneMenu = () => {
  // Create local classes
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <List dense className={classes.listRoot}>
        <ListItem dense className={classes.listItem}>
          <ListItemText>Scene Menu</ListItemText>
        </ListItem>
      </List>
    </ListItem>
  );
};

SceneMenu.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(SceneMenu);
