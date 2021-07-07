import React, { useMemo } from 'react';
import { Handle } from 'react-flow-renderer';

import { makeStyles } from '@material-ui/core/styles';

import { Grid, Tooltip, List, ListItem, Typography } from '@material-ui/core';

import clsx from 'clsx';

import PatchDetails from '../shared/PatchDetails/index';
import PatchValue from './PatchValue/index';
import ShapePreview from './ShapePreview/index';

const useStyles = makeStyles((theme) => ({
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

export default function Generator({ data }) {
  const { uuid, label, width, height } = useMemo(()=>data, [data]);

  const classes = useStyles({ width, height });
  
  return <List className={classes.root}>
  <ListItem className={classes.propItem}>
    <PatchDetails {...{ name:label, type: 'Generator'}} />
  </ListItem>
  <ListItem className={classes.propItem}>
    <Grid container className={classes.propGrid}>
      <Grid item xs={12}>
        <Typography>Position</Typography>
      </Grid>
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={10}>
        <PatchValue {...{ uuid: uuid, propName: 'position' }} />
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Position" aria-label="position">
          <div><Handle
            type="source"
            position="right"
            id={`${uuid}-position`}
            // isValidConnection={(connection) => { console.log(connection); return true}}
            // onConnect={(params) => { console.log('handle onConnect', params); }}
            className={clsx(classes.handle, classes.handleRight)}
          /></div>
        </Tooltip>
      </Grid>
    </Grid>
  </ListItem>
  <ListItem>
    <ShapePreview {...{ uuid: uuid, propName: 'position' }} />
  </ListItem>
</List>;
}