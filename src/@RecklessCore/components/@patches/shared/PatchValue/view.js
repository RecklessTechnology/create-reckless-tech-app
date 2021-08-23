/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  propText: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
}));

const PatchValueView = ({ value }) => {
  const classes = useStyles();
  if (typeof value === 'object') {
    return <Typography className={classes.propText}>{(`[${value.map((v) => (`${v.toFixed(3)}`))}]`)}</Typography>;
  }
  return <Typography className={classes.propText}>{`${value}`}</Typography>;
};

export default memo(PatchValueView);
