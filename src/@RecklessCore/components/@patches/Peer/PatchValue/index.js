import { useState, useEffect, useRef, useCallback } from 'react';

import usePeersContext from '../../../../contexts/usePeersContext';

import PatchValueView from '../../shared/PatchValue/view';

const PatchValue = ({ uuid, propName, b }) => {
  const { findPeer } = usePeersContext();
  const peerObj = findPeer(uuid);

  const [propVal, setPropVal] = useState(0);

  let isMounted = useRef(false);
  
  const updateProp = useCallback((val)=>{
    if (isMounted.current) {
      setPropVal(val)
    }
  }, [isMounted, setPropVal]);

  useEffect(()=>{
    if (peerObj !== undefined) {
      isMounted.current = true;
      if (peerObj !== undefined) {
        peerObj.subscribe(`${propName}-updated`, updateProp);
      }
    }
    return ()=>{
      isMounted.current = false;
    };
  }, [peerObj, propName, updateProp]);

  if (peerObj === undefined) { return null }

  return <PatchValueView {...{ value: propVal }} />;
}

export default PatchValue;