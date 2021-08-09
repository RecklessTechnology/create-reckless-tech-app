/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import { memo } from 'react';

import React, {
  ListSubheader, ListItem, List, Grid,
} from '@material-ui/core';

import RoomName from '../RoomName';
import RoomQR from '../RoomQR';
import RoomRefreshIdButton from '../RoomRefreshIdButton';
import RoomCopyUrlButton from '../RoomCopyUrlButton';
import RoomOpenUrlButton from '../RoomOpenUrlButton';

import { isHost } from '../../utils/userCheck';

const RoomInfo = () => (
  <List>
    <ListSubheader>Room</ListSubheader>
    <ListItem>
      <RoomQR />
    </ListItem>
    <ListItem>
      <RoomName />
    </ListItem>
    <ListItem>
      <Grid container>
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

RoomInfo.whyDidYouRender = true;

export default memo(RoomInfo);
