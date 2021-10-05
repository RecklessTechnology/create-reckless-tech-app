/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, {
  useRef, useCallback, useEffect, useState,
} from 'react';

import useTransformsContext from '../../../../contexts/useTransformsContext';

import TransformSettingsView from './view';

const TransformSettings = (props) => {
  const { uuid, propName, defaultVal } = props;
  const { findTransform } = useTransformsContext();
  const transformObj = findTransform(uuid);

  const [val, setVal] = useState(defaultVal);

  const isMounted = useRef(false);

  const updateValue = useCallback((v) => {
    if (isMounted.current) {
      setVal(v);
    }
  }, [isMounted, setVal]);

  useEffect(() => {
    if (transformObj !== undefined) {
      isMounted.current = true;

      transformObj.subscribe(`${uuid}-${propName}-updated`, updateValue);
      setVal(transformObj[propName]);
    }
    return () => {
      isMounted.current = false;
    };
  }, [uuid, transformObj, updateValue, propName]);

  return (
    <TransformSettingsView
      {...props}
      {...{
        value: val,
        setValue: (v) => {
          if (transformObj !== undefined) {
            transformObj[`set${propName.replace(/^\w/, (c) => c.toUpperCase())}`](v);
          }
        },
      }}
    />
  );
};

TransformSettings.whyDidYouRender = true;

export default TransformSettings;
