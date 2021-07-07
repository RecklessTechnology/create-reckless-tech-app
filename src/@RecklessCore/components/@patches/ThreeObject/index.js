import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem } from '@material-ui/core';

import PropListItem from '../shared/PropListItem/index';
import PatchValue from './PatchValue/index';
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
  propGrid: {
    width: '100%',
    height: '100%',
  },
  propText: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  handle: {
    width: '10px',
    height: '10px',
    position: 'relative',
    margin: 0,
    padding: 0,
    borderRadius: 0,
    marginTop: 10,
  },
  handleLeft: {
    float: 'left',
    left: '-25px'
  },
  handleRight: {
    float: 'right',
    right: '-25px'
  }
}));

const ThreeObjectPatch = ({ data }) => {
  const { uuid, label, type, width, height, children, isChildHidden } = data;
  const classes = useStyles({ width, height });

  const props = [
    // { uuid: uuid, propName: 'disabled', disableInput: false, disableOutput: false },
    // { uuid: uuid, propName: 'debug', disableInput: false, disableOutput: false },
    { uuid: uuid, propName: 'position', disableInput: false, disableOutput: true },
    { uuid: uuid, propName: 'rotation', disableInput: false, disableOutput: true },
    // { uuid: uuid, propName: 'scale', disableInput: false, disableOutput: false},
  ]

  return (<List className={classes.root}>
    <ListItem className={classes.propItem}>
      <PatchDetails {...{ name:label, type: type}} />
    </ListItem>
    <ListItem className={classes.propItem}>
      <ParentChildProp {...{isChildHidden: isChildHidden, type: type, uuid:uuid, children: children}} />
    </ListItem>
    {props.map((p)=>(<PropListItem key={`${p.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: p.uuid, propName: p.propName }} /></PropListItem>))}
  </List>);
}

export default ThreeObjectPatch;