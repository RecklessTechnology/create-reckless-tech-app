import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem } from '@material-ui/core';

import PropListItem from '../shared/PropListItem/index';
import PatchValue from './PatchValue/index';
// import PatchDetails from '../shared/PatchDetails/index';
import TransformInfo from '../../TransformInfo';
import useTransformsContext from '../../../contexts/useTransformsContext';

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

const TransformPatch = ({ data }) => {
  const { findTransform } = useTransformsContext();
  const [ transform, setTransform ] = useState(null);
  const { id, width, height, } = data;
  const classes = useStyles({ width, height });
  
  const props = [
    // { uuid: uuid, propName: 'disabled', disableInput: false, disableOutput: false },
    // { uuid: uuid, propName: 'debug', disableInput: false, disableOutput: false },
    { uuid: id, propName: 'data', disableInput: false, disableOutput: false },
  ]

  useEffect(()=>{
    const p = findTransform(id);
    setTransform(p);
  }, [id, findTransform, setTransform])

  return (<List className={classes.root}>
    <ListItem className={classes.propItem}>
      {/* <PatchDetails {...{ name:id, type: type}} /> */}
      <TransformInfo transformInfo={transform}></TransformInfo>
    </ListItem>
    {props.map((p)=>(<PropListItem key={`${p.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: p.uuid, propName: p.propName }} /></PropListItem>))}
  </List>);
}

export default TransformPatch;