/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Typography, Grid } from '@material-ui/core';

import OutputHandle from '../OutputHandle';
import InputHandle from '../InputHandle';

const useStyles = makeStyles(() => ({
  propGrid: {
    width: '100%',
    height: '100%',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  propText: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
}));

const ParentChildProp = ({
  // eslint-disable-next-line no-unused-vars
  type, uuid, children, isChildHidden,
}) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.propGrid}>
      <Grid item xs={12}>
        <Typography className={classes.propText}>{`Children (${children ? children.length : 0}) ${type !== 'Scene' ? '| Parent' : ''}`}</Typography>
      </Grid>
      <Grid item xs={1}>
        <InputHandle {...{ uuid, propName: 'children' }} />
      </Grid>
      <Grid item xs={10}>
        <Typography className={classes.propText}>&nbsp;</Typography>
      </Grid>
      <Grid item xs={1}>
        {type !== 'Scene' ? <OutputHandle {...{ uuid, propName: 'parent' }} /> : null}
      </Grid>
    </Grid>
  );
};

export default ParentChildProp;
