import { memo } from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme)=>({
  propText: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
}));

const PatchValueView = ({ value }) => {
  const classes = useStyles();
  if (typeof value === 'object') {
    return <Typography className={classes.propText}>{(value.map((v, idx)=>(`${v.toFixed(3)}${value.length-1!==idx?', ':''} `)))}</Typography>;
  }
  return <Typography className={classes.propText}>{`${value}`}</Typography>;
}

export default memo(PatchValueView);