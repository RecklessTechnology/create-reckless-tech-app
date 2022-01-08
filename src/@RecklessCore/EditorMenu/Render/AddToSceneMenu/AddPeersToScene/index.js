import PropTypes from 'prop-types';

import React, {
  useRef, useState, useEffect, useCallback,
  memo,
} from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  ListItemIcon,
  ListSubheader,
  MenuItem,
  Typography,
} from '@material-ui/core';

import useConnectionsContext from '../../../../Connections/Contexts/useConnectionsContext';
import useAppContext from '../../../../App/Contexts/useAppContext';
import { getIconByType } from '../../../../Utils/iconLookup';

const useStyles = makeStyles(() => ({
  list: {
    padding: 0,
    width: '100%',
  },
  sectionTitle: {
    marginTop: 10,
  },
}));

const AddPeersToScene = ({ closeMenu }) => {
  const { addPeer, sceneJSON } = useAppContext();
  const { getConnectionsArray } = useConnectionsContext();
  const { subscribe, unsubscribe } = useAppContext();

  const classes = useStyles();

  const [connections, setConnections] = useState([]);

  useEffect(() => { // update data on load
    const peer = getConnectionsArray();
    if (peer !== undefined) {
      setConnections(peer.filter((p) => (!p.isMe)));
    }
  }, [setConnections, getConnectionsArray]);

  const isMounted = useRef(false);

  const updateConnections = useCallback(() => {
    if (isMounted.current) {
      const peer = getConnectionsArray();
      if (peer !== undefined) {
        setConnections(peer.filter((p) => (!p.isMe)));
      }
    }
  }, [getConnectionsArray]);

  useEffect(() => {
    if (updateConnections !== undefined) {
      isMounted.current = true;
      subscribe('connection-modified', updateConnections);
    }
    return () => {
      isMounted.current = false;
      unsubscribe('connection-modified', updateConnections);
    };
  }, [subscribe, unsubscribe, updateConnections]);

  if (connections.length === 0) {
    return (
      <ul className={classes.list}>
        <ListSubheader>No Connected Peers</ListSubheader>
      </ul>
    );
  }

  return (
    <ul className={classes.list}>
      <ListSubheader>Add Peer</ListSubheader>
      {connections.map((connection) => (
        <MenuItem
          dense
          key={`add_peer_menu_${connection.uuid}_${connection.connectionId}`}
          disabled={(sceneJSON.peers.filter((p) => p.uuid === connection.uuid).length > 0)}
          onClick={() => { addPeer(connection.uuid); closeMenu(); }}
        >
          <ListItemIcon>
            {getIconByType('Peer')}
          </ListItemIcon>
          <Typography variant="inherit">{`${connection.name} (${connection.uuid})`}</Typography>
        </MenuItem>
      ))}
    </ul>
  );
};

AddPeersToScene.whyDidYouRender = (process.env.NODE_ENV === 'development');

AddPeersToScene.propTypes = {
  closeMenu: PropTypes.func.isRequired,
};

export default memo(AddPeersToScene);
