import PropTypes from 'prop-types';

import React, { memo } from 'react';

import {
  makeStyles,
  List, ListSubheader,
  ListItem, ListItemText,
} from '@material-ui/core';
import { groupBy } from '../../../Utils/commonMath';

const useStyles = makeStyles(() => ({
  root: {
    height: 100,
    overflow: 'scroll',
  },
}));

const ListTracks = (tracks) => [].concat(tracks).map((track) => {
  const { title, album, artist } = track;
  return (
    <ListItem key={`${title}-${album}-${artist}`}>
      <ListItemText>{title}</ListItemText>
    </ListItem>
  );
});

const TrackList = ({
  tracks,
}) => {
  const classes = useStyles();
  const groupedByAlbum = groupBy(tracks, 'album');
  return (
    <List className={classes.root}>
      {Object.keys(groupedByAlbum).map((album) => (
        <div key={album}>
          <ListSubheader>{album}</ListSubheader>
          <ListTracks tracks={groupedByAlbum[album]} />
        </div>
      ))}
    </List>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    artist: PropTypes.string,
    album: PropTypes.string,
    audioSrc: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
};

export default memo(TrackList);
