import { useState, useEffect, useRef, useCallback } from 'react';

import useGeneratorsContext from '../../../../contexts/useGeneratorsContext';

import PatchValueView from '../../shared/PatchValue/view';

const PatchValue = ({ uuid, propName, a }) => {
  const { findGenerator } = useGeneratorsContext();
  const generatorObj = findGenerator(uuid);
  const [propVal, setPropVal] = useState(0);

  let isMounted = useRef(false);
  
  const updateProp = useCallback((val)=>{
    if (isMounted.current) {
      setPropVal(val)
    }
  }, [isMounted, setPropVal]);

  useEffect(()=>{
    if (generatorObj !== undefined) {
      isMounted.current = true;
      generatorObj.subscribe(`${propName}-updated`, updateProp);
    }
    return ()=>{
      isMounted.current = false;
    };
  }, [generatorObj, propName, updateProp]);
  
  if (generatorObj === undefined) { return null }

  return <PatchValueView {...{ value: propVal }} />;
}

export default PatchValue;