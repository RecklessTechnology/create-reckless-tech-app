import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  List, ListItem,
} from '@material-ui/core';
import PatchDetails from '../../../Components/Patches/PatchDetails';

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

const SelectionMenuView = ({ label, uuid, type }) => {
  // Create local classes
  const classes = useStyles();

  return (
    <ListItem
      role="tabpanel"
      id="selection-inspector-tabpanel"
      aria-labelledby="selection-inspector-tab"
      className={classes.root}
    >
      <List dense className={classes.listRoot}>
        <ListItem dense className={classes.listItem}>
          <PatchDetails {...{ name: `${label} - ${type}`, uuid, type }} />
        </ListItem>
      </List>
    </ListItem>
  );
};

SelectionMenuView.propTypes = {
  label: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

SelectionMenuView.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(SelectionMenuView);
