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

// eslint-disable-next-line react/prop-types
const PatchValueView = ({ value }) => {
  const classes = useStyles();
  switch (true) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown patch value type: ${value}`);
      return <Typography className={classes.propText}>{`${value}`}</Typography>;
    case Array.isArray(value):
      // eslint-disable-next-line react/prop-types
      return <Typography className={classes.propText}>{(`[${value.map((v) => (`${v.toFixed(3)}`))}]`)}</Typography>;
    case typeof value === 'object':
      // eslint-disable-next-line react/prop-types
      return <Typography className={classes.propText}>{`Active: ${value.active}`}</Typography>;
  }
};

export default memo(PatchValueView);
