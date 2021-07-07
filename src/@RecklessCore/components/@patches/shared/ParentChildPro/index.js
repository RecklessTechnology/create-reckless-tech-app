import React from 'react';
import { Handle } from 'react-flow-renderer';

import { makeStyles } from '@material-ui/core/styles';

import { Typography, Grid, Tooltip } from '@material-ui/core';

import clsx from 'clsx';

const useStyles = makeStyles((theme)=>({
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
}))

const ParentChildProp = ({ type, uuid, children, isChildHidden }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.propGrid}>
        <Grid item xs={1}>
          <Tooltip title="Children" aria-label="children">
            <div><Handle
              type="source"
              position="left"
              id={`${uuid}-children`}
              // isValidConnection={(connection) => { console.log(connection); return true}}
              // onConnect={(params) => { console.log('handle onConnect', params); }}
              className={clsx(classes.handle, classes.handleLeft)}
            /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <Typography className={classes.propText}>{`${isChildHidden} (${children ? children.length : 0}) Children${type!=='Scene' ? ' | Parent' : ''}`}</Typography>
        </Grid>
        <Grid item xs={1}>
          {type!=='Scene' ? <Tooltip title="Parent" aria-label="parent">
            <div><Handle
              type="target"
              position="right"
              id={`${uuid}-parent`}
              // isValidConnection={(connection) => { console.log(connection); return true}}
              // onConnect={(params) => { console.log('handle onConnect', params); }}
              className={clsx(classes.handle, classes.handleRight)}
            /></div>
          </Tooltip> : null}
        </Grid>
      </Grid>
  )
}

export default ParentChildProp;