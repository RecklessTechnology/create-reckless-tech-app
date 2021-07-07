import { memo } from 'react';

import { ListSubheader, ListItem, List, Grid } from "@material-ui/core";

import RoomName from '../RoomName';
import RoomQR from '../RoomQR';
import RoomRefreshIdButton from '../RoomRefreshIdButton';
import RoomCopyUrlButton from '../RoomCopyUrlButton';
import RoomOpenUrlButton from '../RoomOpenUrlButton';


const RoomInfo = (props) => {
  return (
    <List>
      <ListSubheader>Room</ListSubheader>
      <ListItem>
        <RoomQR/>
      </ListItem>
      <ListItem>
        <RoomName />
      </ListItem>
      <ListItem>
        <Grid container>
          <Grid item xs={4}>
            {(window.location.hash.substr(1) === '') ? <RoomRefreshIdButton /> : null}
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
}

RoomInfo.whyDidYouRender = true;

export default memo(RoomInfo);
