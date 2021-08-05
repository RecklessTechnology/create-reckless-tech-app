/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';

import useAppContext from '../../contexts/useAppContext';
import useConnectionsContext from '../../contexts/useConnectionsContext';

import PingPeerButtonview from './view';

const PingPeerButton = ({ peerInfo }) => {
  const { getMe } = useConnectionsContext();
  const { subscribe } = useAppContext();

  const [me, setMe] = useState({});

  const isMounted = useRef(false);

  useEffect(() => {
    setMe(getMe());
  }, [setMe, getMe]);

  const updateMe = useCallback(() => { // update data only when peer list is modified
    if (isMounted.current) {
      const m = getMe();
      if (m !== undefined) {
        setMe(m);
      }
    }
  }, [getMe, setMe]);

  useEffect(() => {
    if (getMe !== undefined) {
      isMounted.current = true;
      subscribe('me-modified', updateMe);
    }
    return () => {
      isMounted.current = false;
    };
  }, [getMe, subscribe, updateMe]);

  if (!me) { return null; }

  return <PingPeerButtonview {...{ me, peerInfo }} />;
};

PingPeerButton.whyDidYouRender = true;

export default PingPeerButton;
