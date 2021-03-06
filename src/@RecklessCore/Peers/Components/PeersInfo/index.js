import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem } from '@material-ui/core';

import HostInfo from '../HostInfo';
import MeInfo from '../MeInfo';
import PeersList from '../PeersList';

const useStyles = makeStyles(() => ({
  list: {
    width: '100%',
  },
  listItem: {
    paddingTop: 0,
  },
}));

const PeersInfo = () => {
  // Create local classes
  const classes = useStyles();

  return (

    <ListItem dense className={classes.listItem}>
      <List dense className={classes.list}>
        <MeInfo />
        <HostInfo />
        <PeersList />
      </List>
    </ListItem>
  );
};

PeersInfo.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(PeersInfo);
