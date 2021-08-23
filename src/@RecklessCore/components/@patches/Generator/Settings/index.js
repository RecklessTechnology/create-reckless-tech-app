/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, {
  useRef, useCallback, useEffect, useState,
} from 'react';

import useGeneratorsContext from '../../../../contexts/useGeneratorsContext';
import GeneratorSettingsView from './view';

const GeneratorSettings = ({ uuid }) => {
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

      generatorObj.subscribe(`${uuid}-rpm-updated`, updateRPM);
      setRPMs(generatorObj.rpm);

      generatorObj.subscribe(`${uuid}-resolution-updated`, updateRes);
      setRes(generatorObj.resolution);
    }
    return () => {
      isMounted.current = false;
    };
  }, [uuid, generatorObj, updateRPM, updateRes]);

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

GeneratorSettings.whyDidYouRender = true;

export default GeneratorSettings;
