import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';

import useTransformsContext from '../../Contexts/useTransformsContext';

import PatchValueView from '../../../Components/Patches/PatchValue/view';

const PatchValue = ({ uuid, propName }) => {
  const { subscribe, unsubscribe } = useAppContext();
  const { findTransform } = useTransformsContext();
  const transformObj = findTransform(uuid);

  const [propVal, setPropVal] = useState([0, 0, 0]);

  const isMounted = useRef(false);

  const updateProp = useCallback((val) => {
    if (isMounted.current) {
      setPropVal(val);
    }
  }, [isMounted, setPropVal]);

  useEffect(() => {
    if (transformObj !== undefined) {
      isMounted.current = true;
      subscribe(`${uuid}-${propName}-updated`, updateProp.apply);
    }
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-${propName}-updated`, updateProp);
    };
  }, [subscribe, unsubscribe, transformObj, propName, updateProp, uuid]);

  if (transformObj === undefined) { return <PatchValueView {...{ value: [0, 0, 0] }} />; }

  return <PatchValueView {...{ value: propVal }} />;
};

PatchValue.propTypes = {
  propName: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default PatchValue;
