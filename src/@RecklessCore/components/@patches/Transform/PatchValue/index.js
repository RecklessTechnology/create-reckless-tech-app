/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';

import useTransformsContext from '../../../../contexts/useTransformsContext';

import PatchValueView from '../../shared/PatchValue/view';

const PatchValue = ({ uuid, propName }) => {
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
      transformObj.subscribe(`${uuid}-${propName}-updated`, updateProp);
    }
    return () => {
      isMounted.current = false;
    };
  }, [transformObj, propName, updateProp, uuid]);

  if (transformObj === undefined) { return <PatchValueView {...{ value: [0, 0, 0] }} />; }

  return <PatchValueView {...{ value: propVal }} />;
};

PatchValue.propTypes = {
  propName: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default PatchValue;
