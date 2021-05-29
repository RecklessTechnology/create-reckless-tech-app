import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

import { makeStyles } from '@material-ui/core/styles';

import { Card, CardContent, Typography } from '@material-ui/core';

export default memo(({ data }) => {
  const classes = makeStyles({
    root: {
      width: 100,
      height: 100,
    },
    title: {
      fontSize: 14,
    },
    list: {
      margin: 0,
      padding: 0,
    },
    item: {
      fontSize: 10,
    }
  })();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>
            Box
          </Typography>
        </CardContent>
      </Card>
      <Handle
        type="source"
        position="left"
        id="BoxPosition"
        style={{ top: '50%', background: '#555' }}
      />
    </>
  );
});