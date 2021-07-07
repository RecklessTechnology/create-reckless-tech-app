import { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem } from "@material-ui/core";

import PeersInfo from '../PeersInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    width: '100%',
    padding: 0,
  },
  listItem: {
    paddingTop: 0,
  }
}));

const PeersMenu = () => {
  // Create local classes
  const classes = useStyles();

  return (
    <ListItem
      role="tabpanel"
      id={`full-width-tabpanel-${0}`}
      aria-labelledby={`full-width-tab-${0}`}
      className={classes.listItem}
    >
      <List className={classes.root}>
        <PeersInfo/>
      </List>
    </ListItem>
  );
};

PeersMenu.whyDidYouRender = true;

export default memo(PeersMenu);