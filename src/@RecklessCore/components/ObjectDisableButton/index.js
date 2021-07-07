import { useState, useRef, useEffect, useCallback } from 'react'

import ObjectDisableButttonView from './view';

import useThreeObjectsContext from '../../contexts/useThreeObjectsContext';

const ObjectDisableButtton = ({ name }) => {
  const { findThreeObjectByName } = useThreeObjectsContext();
  const threeObj = findThreeObjectByName(name);
  
  const [ disabled, setDisabled ] = useState(false);
  
  let isMounted = useRef(false);
  
  const updateProp = useCallback((val)=>{
    if (isMounted.current) {
      setDisabled(val)
    }
  }, [isMounted, setDisabled]);

  useEffect(()=>{
    isMounted.current = true;
    threeObj.subscribe(`disabled-updated`, updateProp);
    return ()=>{
      isMounted.current = false;
    };
  }, [threeObj, updateProp]);


  return <ObjectDisableButttonView {...{ disabled: disabled, setDisabled: threeObj.setDisabled }}/>;
}

ObjectDisableButtton.whyDidYouRender = true;

export default ObjectDisableButtton;