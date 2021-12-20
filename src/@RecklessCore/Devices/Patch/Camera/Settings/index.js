import PropTypes from 'prop-types';

import React, {
  useRef, useCallback, useState, useEffect,
} from 'react';

import useDevicesContext from '../../../Contexts/useDevicesContext';
import useAppContext from '../../../../App/Contexts/useAppContext';

import CameraSettingsView from './view';

const CameraSettings = ({ uuid }) => {
  const { subscribe, unsubscribe } = useAppContext();
  const { findDevice } = useDevicesContext();
  const deviceObj = findDevice(uuid);

  const isMounted = useRef(false);

  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(list[0]);

  const updateSelected = useCallback((val) => {
    if (isMounted.current) {
      setSelected(val);
    }
  }, [isMounted, setSelected]);

  const updateList = useCallback((val) => {
    if (isMounted.current) {
      setList(val);
    }
  }, [isMounted, setList]);

  useEffect(() => {
    if (deviceObj !== undefined) {
      isMounted.current = true;

      setSelected(deviceObj.selectedDevice);
      subscribe(`${uuid}-selected-device-updated`, updateSelected);

      setList(deviceObj.deviceList);
      subscribe(`${uuid}-device-list-updated`, updateList);
    }
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-selected-device-updated`, updateSelected);
      unsubscribe(`${uuid}-device-list-updated`, updateList);
    };
  }, [subscribe, unsubscribe, uuid, deviceObj, updateSelected, updateList]);

  if (selected === undefined) return false;

  const val = (list.filter((d) => d.label === selected.label).length < 1)
    ? list[0]
    : list.filter((d) => d.label === selected.label)[0];

  return (
    <CameraSettingsView
      {...{
        propName: 'Select Camera',
        data: list,
        value: val,
        setValue: (v) => {
          if (deviceObj !== undefined) {
            deviceObj.setSelectedDevice(list.filter((d) => d.label === v)[0]);
          }
        },
      }}
    />
  );
};

CameraSettings.propTypes = {
  uuid: PropTypes.string.isRequired,
};

export default CameraSettings;
