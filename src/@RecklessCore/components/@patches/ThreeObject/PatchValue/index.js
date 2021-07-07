import { useState, useEffect, useRef, useCallback } from 'react';

import useThreeObjectsContext from '../../../../contexts/useThreeObjectsContext';

import PatchValueView from '../../shared/PatchValue/view';

const PatchValue = ({ uuid, propName, c }) => {
  
  const { findThreeObject } = useThreeObjectsContext();
  const threeObj = findThreeObject(uuid);
  
  const [propVal, setPropVal] = useState(0)

  let isMounted = useRef(false);
  
  const updateProp = useCallback((val)=>{
    if (isMounted.current) {
      setPropVal(val)
    }
  }, [isMounted, setPropVal]);

  useEffect(()=>{
    if (threeObj !== undefined) {
      isMounted.current = true;
      threeObj.subscribe(`${propName}-updated`, updateProp);
    }
    return ()=>{
      isMounted.current = false;
    };
  }, [threeObj, propName, updateProp]);

  if (threeObj === undefined) { return null; }

  return <PatchValueView {...{ value: propVal }} />;
}

export default PatchValue;