import { useState, useEffect, useMemo, useCallback } from 'react';

import useAppContext from '../../contexts/useAppContext';
import usePeersContext from '../../contexts/usePeersContext';

import PingPeerButtonview from './view';

const PingPeerButton = ({peerInfo}) => {
  const { getMe } = usePeersContext();
  const { subscribe } = useAppContext();

  const [ me, setMe ] = useState({});

  useEffect(()=>{
    setMe(getMe());
  }, [setMe, getMe]);

  const updateMe = useCallback((peer)=>{ //update data only when peer list is modified
    const m = getMe()
    if (m !== undefined) {
      setMe(m);
    }
  }, [getMe, setMe])
  useMemo(()=>subscribe('me-modified', updateMe), [subscribe, updateMe]);

  if (!me) { return null; }

  return <PingPeerButtonview {...{me: me, peerInfo: peerInfo}}/>;
}

PingPeerButton.whyDidYouRender = true;

export default PingPeerButton;