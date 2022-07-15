import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem } from '@material-ui/core';

import PeersInfo from './Components/PeersInfo';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
    width: '100%',
    padding: 0,
  },
  listItem: {
    paddingTop: 0,
  },
}));

const PeersMenu = () => {
  // Create local classes
  const classes = useStyles();

  return (
    <ListItem
      role="tabpanel"
      id="peers-inspector-tabpanel"
      aria-labelledby="peers-inspector-tab"
      className={classes.listItem}
    >
      <List dense className={classes.root}>
        <PeersInfo />
      </List>
    </ListItem>
  );
};

PeersMenu.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(PeersMenu);
