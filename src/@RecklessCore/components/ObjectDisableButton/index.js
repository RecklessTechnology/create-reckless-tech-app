import {
  useState, useRef, useEffect, useCallback,
} from 'react';

import ObjectDisableButttonView from './view';

import useThreeObjectsContext from '../../contexts/useThreeObjectsContext';

const ObjectDisableButtton = ({ uuid, name }) => {
  const { findThreeObjectByName } = useThreeObjectsContext();
  const threeObj = findThreeObjectByName(name);

  const [disabled, setDisabled] = useState(false);

  const isMounted = useRef(false);

  const updateProp = useCallback((val) => {
    if (isMounted.current) {
      setDisabled(val);
    }
  }, [isMounted, setDisabled]);

  useEffect(() => {
    if (threeObj !== undefined) {
      isMounted.current = true;
      threeObj.subscribe(`${uuid}-disabled-updated`, updateProp);
    }
    return () => {
      isMounted.current = false;
    };
  }, [threeObj, updateProp, uuid]);

  return <ObjectDisableButttonView {...{ disabled, setDisabled: threeObj.setDisabled }} />;
};

ObjectDisableButtton.whyDidYouRender = true;

export default ObjectDisableButtton;
