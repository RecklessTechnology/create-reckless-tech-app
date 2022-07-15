import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem } from '@material-ui/core';

import RoomInfo from './Components/RoomInfo';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 0,
  },
  listRoot: {
    display: 'block',
    width: '100%',
    paddingTop: 0,
  },
}));

const RoomMenu = () => {
  // Create local classes
  const classes = useStyles();

  return (
    <ListItem
      role="tabpanel"
      id="room-inspector-tabpanel"
      aria-labelledby="room-inspector-tab"
      className={classes.root}
    >
      <List dense className={classes.listRoot}>
        <RoomInfo />
      </List>
    </ListItem>
  );
};

RoomMenu.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(RoomMenu);
