import { useState, useEffect, useRef, useCallback } from 'react';

import useAppContext from '../../contexts/useAppContext';
import usePeersContext from '../../contexts/usePeersContext';

import ShareScenePeerButtonView from './view';

const ShareScenePeerButton = ({ peerInfo }) => {
  const { subscribe } = useAppContext();
  const { getMe } = usePeersContext();
  
  const [ me, setMe ] = useState({});

  let isMounted = useRef(false); 
  
  useEffect(()=>{
    if (isMounted.current) {
      const m = getMe();
      if (m !== undefined) {
        setMe(m);
      }
    }
  }, [setMe, getMe]);

  const updateMe = useCallback((peer)=>{ //update data only when peer list is modified
    if (isMounted.current) {
      const m = getMe();
      if (m !== undefined) {
        setMe(m);
      }
    }
  }, [getMe, setMe])
  
  

  useEffect(()=>{
    isMounted.current = true;
    subscribe('me-modified', updateMe);
    return ()=>{
      isMounted.current = false;
    };
  }, [subscribe, updateMe]);

  if (!me) { return null; }

  return <ShareScenePeerButtonView {...{me: me, peerInfo: peerInfo}}/>;
}

ShareScenePeerButton.whyDidYouRender = true;

export default ShareScenePeerButton;