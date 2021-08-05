/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';

import { makeStyles } from '@material-ui/styles';

import { MenuItem } from '@material-ui/core';

import useConnectionsContext from '../../contexts/useConnectionsContext';
import useAppContext from '../../contexts/useAppContext';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: 0,
  },
  list: {
    width: '100%',
  },
  sectionTitle: {
    marginTop: 10,
  },
}));

const AddPeersToScene = ({ closeMenu }) => {
  const { addPeer, sceneJSON } = useAppContext();
  const { getConnectionsArray } = useConnectionsContext();
  const { subscribe } = useAppContext();

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
    };
  }, [subscribe, updateConnections]);

  if (connections.length === 0) { return null; }

  return (
    <ul className={classes.listItem}>

      {connections.map((connection) => <MenuItem disabled={(sceneJSON.peers.filter((p) => p.uuid === connection.uuid).length > 0)} key={`add_peer_menu_${connection.uuid}_${connection.connectionId}`} onClick={() => { addPeer(connection.uuid); closeMenu(); }}>{`${connection.name} (${connection.uuid})`}</MenuItem>)}
    </ul>
  );
};

AddPeersToScene.whyDidYouRender = true;

AddPeersToScene.propTypes = {
  closeMenu: PropTypes.func.isRequired,
};

export default AddPeersToScene;
