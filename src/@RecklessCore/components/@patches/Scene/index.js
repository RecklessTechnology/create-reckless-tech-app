import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem } from '@material-ui/core';

import PatchDetails from '../shared/PatchDetails/index';

import ParentChildProp from '../shared/ParentChildPro/index';

const useStyles = makeStyles((theme)=>({
  root: {
    width: (props)=>(props.width),
    height: (props)=>(props.height),
    backgroundColor: theme.palette.background.paper,
    border: '1px solid white',
  },
  propItem: {
    margin: 0,
    padding: '0 10px',
  },
}));

const ScenePatch = ({ data }) => {
  const { uuid, label, type, width, height, children, isChildHidden } = data;
  const classes = useStyles({ width, height });
  // console.log('render scene patch');

  return (<List className={classes.root}>
    <ListItem className={classes.propItem}>
      <PatchDetails {...{ name:label, type: type}} />
    </ListItem>
    <ListItem className={classes.propItem}>
      <ParentChildProp {...{isChildHidden: isChildHidden, type: type, uuid:uuid, children: children}} />
    </ListItem>
  </List>);
}

export default ScenePatch;