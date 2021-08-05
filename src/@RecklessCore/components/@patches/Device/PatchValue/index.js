/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';

import useDevicesContext from '../../../../contexts/useDevicesContext';

import PatchValueView from '../../shared/PatchValue/view';

const PatchValue = ({ uuid, propName }) => {
  const { findDevice } = useDevicesContext();
  const deviceObj = findDevice(uuid);

  const [propVal, setPropVal] = useState([0, 0, 0]);

  const isMounted = useRef(false);

  const updateProp = useCallback((val) => {
    if (isMounted.current) {
      setPropVal(val);
    }
  }, [isMounted, setPropVal]);

  useEffect(() => {
    if (deviceObj !== undefined) {
      isMounted.current = true;
      deviceObj.subscribe(`${uuid}-${propName}-updated`, updateProp);
    }
    return () => {
      isMounted.current = false;
    };
  }, [deviceObj, propName, updateProp, uuid]);

  if (deviceObj === undefined) { return <PatchValueView {...{ value: [0, 0, 0] }} />; }

  return <PatchValueView {...{ value: propVal }} />;
};

PatchValue.propTypes = {
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};

export default PatchValue;
