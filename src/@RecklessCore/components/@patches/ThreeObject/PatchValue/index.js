/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';

import useThreeObjectsContext from '../../../../contexts/useThreeObjectsContext';

import PatchValueView from '../../shared/PatchValue/view';

const PatchValue = ({ uuid, propName }) => {
  const { findThreeObject } = useThreeObjectsContext();
  const threeObj = findThreeObject(uuid);

  const [propVal, setPropVal] = useState([0, 0, 0]);

  const isMounted = useRef(false);

  const updateProp = useCallback((val) => {
    if (isMounted.current) {
      setPropVal(val);
    }
  }, [isMounted, setPropVal]);

  useEffect(() => {
    if (threeObj !== undefined) {
      isMounted.current = true;
      threeObj.subscribe(`${uuid}-${propName}-updated`, updateProp);
    }
    return () => {
      isMounted.current = false;
    };
  }, [threeObj, propName, updateProp, uuid]);

  if (threeObj === undefined) { return <PatchValueView {...{ value: [0, 0, 0] }} />; }

  return <PatchValueView {...{ value: propVal }} />;
};

PatchValue.propTypes = {
  propName: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default PatchValue;
