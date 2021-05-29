import { makeStyles } from '@material-ui/core/styles';

import { Divider, List, ListItem } from "@material-ui/core";

import PeersList from './PeersList';
import RoomInfo from './RoomInfo';

function PeersMenu(props) {
  // Create local classes
  const classes = makeStyles((theme) => ({
    root: {
      display: 'block',
      width: '100%',
    },
  }))();

  return (
    <ListItem
      role="tabpanel"
      id={`full-width-tabpanel-${0}`}
      aria-labelledby={`full-width-tab-${0}`}
    >
      <List className={classes.root}>
        <RoomInfo/>
        <Divider/>
        <PeersList/>
      </List>
    </ListItem>
  );
}

export default PeersMenu;
