/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Typography, Grid, ListItem } from '@material-ui/core';

import InputHandle from '../InputHandle';
import OutputHandle from '../OutputHandle';

const useStyles = makeStyles(() => ({
  propItem: {
    margin: 0,
    padding: '0 10px',
    oveflow: 'hidden',
  },
  propGrid: {
    width: '100%',
    height: '100%',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  propText: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
}));

const PropListItemView = ({
  children, uuid, propName, disableInput, disableOutput,
}) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.propItem}>
      <Grid container className={classes.propGrid}>
        <Grid item xs={12}>
          <Typography className={classes.propText}>{propName}</Typography>
        </Grid>
        <Grid item xs={1}>
          {disableInput === false ? <InputHandle {...{ uuid, propName }} /> : null}
        </Grid>
        <Grid item xs={10}>
          {children}
        </Grid>
        <Grid item xs={1}>
          {disableOutput === false ? <OutputHandle {...{ uuid, propName }} /> : null}
        </Grid>
      </Grid>
    </ListItem>
  );
};

PropListItemView.whyDidYouRender = false;

export default memo(PropListItemView);
