import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';

import useGeneratorsContext from '../../Contexts/useGeneratorsContext';

import PatchValueView from '../../../Components/Patches/PatchValue/view';

const PatchValue = ({ uuid, propName }) => {
  const { subscribe, unsubscribe } = useAppContext();
  const { findGenerator } = useGeneratorsContext();
  const generatorObj = findGenerator(uuid);
  const [propVal, setPropVal] = useState([0, 0, 0]);

  const isMounted = useRef(false);

  const updateProp = useCallback((val) => {
    if (isMounted.current) {
      setPropVal(val);
    }
  }, [isMounted, setPropVal]);

  useEffect(() => {
    if (generatorObj !== undefined) {
      isMounted.current = true;
      subscribe(`${uuid}-${propName.toLowerCase()}-updated`, updateProp);
    }
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-${propName.toLowerCase()}-updated`, updateProp);
    };
  }, [subscribe, unsubscribe, generatorObj, propName, updateProp, uuid]);

  if (generatorObj === undefined) { return <PatchValueView {...{ value: [0, 0, 0] }} />; }

  return <PatchValueView {...{ value: propVal }} />;
};

PatchValue.propTypes = {
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};

export default PatchValue;
