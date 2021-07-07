import { useCallback, useMemo, useState } from 'react';

import { Divider } from '@material-ui/core';

import useAppContext from '../../contexts/useAppContext';

import ObjectInfo from '../ObjectInfo';
import useThreeObjectsContext from '../../contexts/useThreeObjectsContext';

const SceneList = () => {
  const { threeObjectNamesArray } = useThreeObjectsContext();
  const { subscribe } = useAppContext();
  const [ forceListUpdate, setForceListUpdate ] = useState(false);
  
  let [ objects, setObjects ] = useState([]);

  const updateObjects = useCallback(()=>{ //update data only when peer list is modified
    setForceListUpdate(true);
  }, [setForceListUpdate])
  useMemo(()=>subscribe('threeObjects-list-changed', updateObjects), [subscribe, updateObjects]);

  useMemo(()=>{
    if (forceListUpdate) {
      setObjects(threeObjectNamesArray());
      setForceListUpdate(false);
    }
  }, [forceListUpdate, setObjects, threeObjectNamesArray]);

  return threeObjectNamesArray().map((name)=>(<div key={name}><ObjectInfo name={name}/><Divider /></div>));
}

SceneList.whyDidYouRender = true;

export default SceneList;
