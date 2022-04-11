import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';

import useDevicesContext from '../../../Devices/Contexts/useDevicesContext';

import PatchValueView from '../../../Components/Patches/PatchValue/view';

const PatchValue = ({ uuid, propName }) => {
  const { subscribe, unsubscribe } = useAppContext();
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
      subscribe(`${uuid}-${propName}-updated`, updateProp);
    }
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-${propName}-updated`, updateProp);
    };
  }, [subscribe, unsubscribe, deviceObj, propName, updateProp, uuid]);

  if (deviceObj === undefined) { return <PatchValueView {...{ value: [0, 0, 0] }} />; }

  return <PatchValueView {...{ value: propVal }} />;
};

PatchValue.propTypes = {
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};

export default PatchValue;
