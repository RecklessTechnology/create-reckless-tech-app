import { memo } from 'react';

import React, {
  Typography, ListItem, List, Grid,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

import RoomName from '../RoomName';
import RoomQR from '../RoomQR';
import RoomRefreshIdButton from '../Buttons/RoomRefreshIdButton';
import RoomCopyUrlButton from '../Buttons/RoomCopyUrlButton';
import RoomOpenUrlButton from '../Buttons/RoomOpenUrlButton';

import { isHost } from '../../../Utils/userCheck';

const useStyles = makeStyles(() => ({
  sectionTitle: {
    marginTop: 10,
  },
}));

const RoomInfo = () => {
  const classes = useStyles();

  return (
    <List dense>
      <ListItem dense>
        <Grid spacing={0} container>
          <Grid item xs={12}>
            <Typography className={classes.sectionTitle}>Room</Typography>
          </Grid>
        </Grid>
      </ListItem>
      <ListItem dense>
        <RoomQR />
      </ListItem>
      <ListItem dense>
        <RoomName />
      </ListItem>
      <ListItem dense>
        <Grid spacing={0} container>
          <Grid item xs={4}>
            {(isHost()) ? <RoomRefreshIdButton /> : null}
          </Grid>
          <Grid item xs={4}>
            <RoomCopyUrlButton />
          </Grid>
          <Grid item xs={4}>
            <RoomOpenUrlButton />
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};

RoomInfo.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(RoomInfo);
