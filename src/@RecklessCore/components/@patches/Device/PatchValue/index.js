import { useState, useEffect, useRef, useCallback } from 'react';

import useDevicesContext from '../../../../contexts/useDevicesContext';

import PatchValueView from '../../shared/PatchValue/view';

const PatchValue = ({ uuid, propName, b }) => {
  const { findDevice } = useDevicesContext();
  const deviceObj = findDevice(uuid);

  const [propVal, setPropVal] = useState(0);

  let isMounted = useRef(false);
  
  const updateProp = useCallback((val)=>{
    if (isMounted.current) {
      setPropVal(val)
    }
  }, [isMounted, setPropVal]);

  useEffect(()=>{
    if (deviceObj !== undefined) {
      isMounted.current = true;
      if (deviceObj !== undefined) {
        deviceObj.subscribe(`${propName}-updated`, updateProp);
      }
    }
    return ()=>{
      isMounted.current = false;
    };
  }, [deviceObj, propName, updateProp]);

  if (deviceObj === undefined) { return null }

  return <PatchValueView {...{ value: propVal }} />;
}

export default PatchValue;