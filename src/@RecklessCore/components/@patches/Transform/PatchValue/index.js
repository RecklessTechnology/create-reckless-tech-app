import { useState, useEffect, useRef, useCallback } from 'react';

import useTransformsContext from '../../../../contexts/useTransformsContext';

import PatchValueView from '../../shared/PatchValue/view';

const PatchValue = ({ uuid, propName, b }) => {
  const { findTransform } = useTransformsContext();
  const transformObj = findTransform(uuid);

  const [propVal, setPropVal] = useState(0);

  let isMounted = useRef(false);
  
  const updateProp = useCallback((val)=>{
    if (isMounted.current) {
      setPropVal(val)
    }
  }, [isMounted, setPropVal]);

  useEffect(()=>{
    if (transformObj !== undefined) {
      isMounted.current = true;
      if (transformObj !== undefined) {
        transformObj.subscribe(`${propName}-updated`, updateProp);
      }
    }
    return ()=>{
      isMounted.current = false;
    };
  }, [transformObj, propName, updateProp]);

  if (transformObj === undefined) { return null }

  return <PatchValueView {...{ value: propVal }} />;
}

export default PatchValue;