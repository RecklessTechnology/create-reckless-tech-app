import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

import { makeStyles } from '@material-ui/core/styles';

import { Typography, Grid, Tooltip, ListItem } from '@material-ui/core';

import clsx from 'clsx';

const useStyles = makeStyles((theme)=>({
  propItem: {
    margin: 0,
    padding: '0 10px',
    oveflow: 'hidden',
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

const PropListItemView = ({ children, uuid, propName, disableInput, disableOutput }) => {
  const classes = useStyles();
  return (<ListItem className={classes.propItem}>
    <Grid container className={classes.propGrid}>
      <Grid item xs={12}>
        <Typography>{propName}</Typography>
      </Grid>
      <Grid item xs={1}>
      {disableInput === false ? <Tooltip title={`set ${propName}`} aria-label={`set ${propName}`}>
          <div><Handle
            type="target"
            position="left"
            id={`${uuid}-set-${propName}`}
            // isValidConnection={(connection) => { console.log(connection); return true}}
            // onConnect={(params) => { console.log('handle onConnect', params); }}
            className={clsx(classes.handle, classes.handleLeft)}
          /></div>
        </Tooltip> : null}
      </Grid>
      <Grid item xs={10}>
        {children}
      </Grid>
      <Grid item xs={1}>
        {disableOutput === false ? <Tooltip title={propName} aria-label={propName}>
          <div><Handle
            type="source"
            position="right"
            id={`${uuid}-${propName}`}
            // isValidConnection={(connection) => { console.log(connection); return true}}
            // onConnect={(params) => { console.log('handle onConnect', params); }}
            className={clsx(classes.handle, classes.handleRight)}
          /></div>
        </Tooltip> : null}
      </Grid>
    </Grid>
  </ListItem>);
}

PropListItemView.whyDidYouRender = false;

export default memo(PropListItemView);