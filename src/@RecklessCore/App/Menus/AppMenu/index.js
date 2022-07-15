import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  List, ListItem,
  ListSubheader,
} from '@material-ui/core';

import AppSettings from '../../Settings';

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

const AppMenu = () => {
  // Create local classes
  const classes = useStyles();

  return (
    <ListItem
      role="tabpanel"
      id="settings-inspector-tabpanel"
      aria-labelledby="settings-inspector-tab"
      className={classes.root}
    >
      <List dense className={classes.listRoot}>
        <ListItem dense className={classes.listItem}>
          <ListSubheader>Application Settings</ListSubheader>
        </ListItem>
        <AppSettings />
      </List>
    </ListItem>
  );
};

AppMenu.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(AppMenu);
