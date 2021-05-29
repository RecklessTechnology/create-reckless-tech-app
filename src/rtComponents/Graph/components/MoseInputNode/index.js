import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

import { makeStyles } from '@material-ui/core/styles';

// import GetMousePos from "./GetMousePos.tsx";
// import GetMouseClick from "./GetMouseClick.tsx";

import { Card, CardContent, Typography } from '@material-ui/core';

export default memo(({ data }) => {
  // const { clientX, clientY } = GetMousePos();
  // const { clicked } = GetMouseClick();

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
            Mouse
          </Typography>
          {/* <ul className={classes.list}>
            <li className={classes.item}>
              {`x: ${clientX}`}
            </li>
            <li className={classes.item}>
              {`y: ${clientY}`}
            </li>
            <li className={classes.item}>
              {`clicked: ${clicked}`}
            </li>
          </ul> */}
        </CardContent>
      </Card>
      <Handle
        type="source"
        position="right"
        id="MousePosition"
        style={{ top: '50%', background: '#555' }}
      />
    </>
  );
});