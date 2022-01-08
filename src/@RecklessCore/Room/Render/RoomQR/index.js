import React, {
  useEffect, useRef, useState, useCallback,
  memo,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ListItemIcon } from '@material-ui/core';

import useConnectionsContext from '../../../Connections/Contexts/useConnectionsContext';
import useAppContext from '../../../App/Contexts/useAppContext';

import RoomQRView from './view';

const useStyles = makeStyles(() => ({
  qrContainer: {
    width: '100%',
    height: '100%',
  },
}));

const RoomQR = () => {
  const { subscribe, unsubscribe } = useAppContext();
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
      unsubscribe('room-modified', updateRoom);
    };
  }, [subscribe, unsubscribe, updateRoom]);

  if (!room) { return null; }

  return (
    <ListItemIcon className={classes.qrContainer} ref={qrRef}>
      <RoomQRView {...{
        size: qrSize,
        url: `${room.url}`,
      }}
      />
    </ListItemIcon>
  );
};

RoomQR.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(RoomQR);
