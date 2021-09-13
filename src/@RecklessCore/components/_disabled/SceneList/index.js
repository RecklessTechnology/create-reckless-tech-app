import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { Divider } from '@material-ui/core';

import useAppContext from '../../contexts/useAppContext';

import ObjectInfo from '../ObjectInfo';
import useThreeObjectsContext from '../../contexts/useThreeObjectsContext';

const SceneList = () => {
  const { threeObjectNamesArray } = useThreeObjectsContext();
  const { subscribe } = useAppContext();

  const [objects, setObjects] = useState([]);

  const isMounted = useRef(false);

  const updateObjects = useCallback(() => { // update data only when peer list is modified
    if (isMounted.current) {
      const o = threeObjectNamesArray();
      if (o !== undefined) {
        setObjects(o);
      }
    }
  }, [threeObjectNamesArray]);

  useEffect(() => {
    if (threeObjectNamesArray !== undefined) {
      isMounted.current = true;
      subscribe('threeObjects-list-changed', updateObjects);
    }
    return () => {
      isMounted.current = false;
    };
  }, [subscribe, threeObjectNamesArray, updateObjects]);

  if (objects.length <= 0) { return null; }

  return objects.map((name) => (
    <div key={name}>
      <ObjectInfo name={name} />
      <Divider />
    </div>
  ));
};

SceneList.whyDidYouRender = true;

export default SceneList;
