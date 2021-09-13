/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem } from '@material-ui/core';

import RoomInfo from '../../Room/RoomInfo';

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
      id={`full-width-tabpanel-${0}`}
      aria-labelledby={`full-width-tab-${0}`}
      className={classes.root}
    >
      <List dense className={classes.listRoot}>
        <RoomInfo />
      </List>
    </ListItem>
  );
};

RoomMenu.whyDidYouRender = true;

export default memo(RoomMenu);
