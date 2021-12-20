import PropTypes from 'prop-types';

import React, {
  useRef, useCallback, useEffect, useState,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';

import useGeneratorsContext from '../../Contexts/useGeneratorsContext';
import GeneratorSettingsView from './view';

const GeneratorSettings = ({ uuid }) => {
  const { subscribe, unsubscribe } = useAppContext();
  const { findGenerator } = useGeneratorsContext();
  const generatorObj = findGenerator(uuid);

  const [rpms, setRPMs] = useState(0);
  const [res, setRes] = useState(1);

  const isMounted = useRef(false);

  const updateRPM = useCallback((val) => {
    if (isMounted.current) {
      setRPMs(val);
    }
  }, [isMounted, setRPMs]);

  const updateRes = useCallback((val) => {
    if (isMounted.current) {
      setRes(val);
    }
  }, [isMounted, setRes]);

  useEffect(() => {
    if (generatorObj !== undefined) {
      isMounted.current = true;

      subscribe(`${uuid}-rpm-updated`, updateRPM);
      setRPMs(generatorObj.rpm);

      subscribe(`${uuid}-resolution-updated`, updateRes);
      setRes(generatorObj.resolution);
    }
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-rpm-updated`, updateRPM);
      unsubscribe(`${uuid}-resolution-updated`, updateRes);
    };
  }, [subscribe, unsubscribe, uuid, generatorObj, updateRPM, updateRes]);

  return (
    <GeneratorSettingsView {...{
      resolution: res,
      rpm: rpms,
      setResolution: (val) => {
        if (generatorObj !== undefined) {
          generatorObj.setResolution(val);
        }
      },
      setRPM: (val) => {
        if (generatorObj !== undefined) {
          generatorObj.setRpm(val);
        }
      },
    }}
    />
  );
};

GeneratorSettings.whyDidYouRender = (process.env.NODE_ENV === 'development');

GeneratorSettings.propTypes = {
  uuid: PropTypes.string.isRequired,
};

export default GeneratorSettings;
