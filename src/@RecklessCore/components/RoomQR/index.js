import { useEffect, useRef, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ListItemIcon } from '@material-ui/core';

import useConnectionsContext from '../../contexts/useConnectionsContext';

import RoomQRView from './view';

const useStyles = makeStyles((theme) => ({
  qrContainer: {
    width: '100%',
    height: '100%',
  },
}));

const RoomQR = () => {
  const { roomInfo } = useConnectionsContext()
  const url = `${window.location.href}#${roomInfo.id}`;

  const qrRef = useRef(null);
  const [ qrSize, setQrSize ] = useState(0);

  // Create local classes
  const classes = useStyles();

  useEffect(() => {
    setQrSize(qrRef.current ? qrRef.current.offsetWidth : 0);
  }, [qrRef]);

  return (
    <ListItemIcon className={classes.qrContainer} ref={qrRef}>
      <RoomQRView {...{
        size: qrSize,
        url: url,
      }}/>
    </ListItemIcon>
  );
}

RoomQR.whyDidYouRender = true;

export default RoomQR;
