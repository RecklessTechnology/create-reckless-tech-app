/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ListItemIcon } from '@material-ui/core';

import useConnectionsContext from '../../contexts/useConnectionsContext';
import useAppContext from '../../contexts/useAppContext';

import RoomQRView from './view';

const useStyles = makeStyles(() => ({
  qrContainer: {
    width: '100%',
    height: '100%',
  },
}));

const RoomQR = () => {
  const { subscribe } = useAppContext();
  const { getRoomInfo } = useConnectionsContext();

  const qrRef = useRef(null);
  const [qrSize, setQrSize] = useState(0);

  // Create local classes
  const classes = useStyles();

  useEffect(() => {
    setQrSize(qrRef.current ? qrRef.current.offsetWidth : 0);
  }, [qrRef]);

  const [room, setRoom] = useState({});

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const r = getRoomInfo();
      if (r !== undefined) {
        setRoom(r);
      }
    }
  }, [setRoom, getRoomInfo]);

  const updateRoom = useCallback(() => { // update data only when peer list is modified
    if (isMounted.current) {
      const r = getRoomInfo();
      if (r !== undefined) {
        setRoom(r);
      }
    }
  }, [getRoomInfo, setRoom]);

  useEffect(() => {
    isMounted.current = true;
    subscribe('room-modified', updateRoom);
    return () => {
      isMounted.current = false;
    };
  }, [subscribe, updateRoom]);

  if (!room) { return null; }

  return (
    <ListItemIcon className={classes.qrContainer} ref={qrRef}>
      <RoomQRView {...{
        size: qrSize,
        url: `${window.location.href}#${room.id}`,
      }}
      />
    </ListItemIcon>
  );
};

RoomQR.whyDidYouRender = true;

export default RoomQR;
