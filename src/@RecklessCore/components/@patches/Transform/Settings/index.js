/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, {
  useRef, useCallback, useEffect, useState,
} from 'react';

import useTransformsContext from '../../../../contexts/useTransformsContext';

import TransformSettingsView from './view';

const TransformSettings = ({ uuid, ...props }) => {
  const { findTransform } = useTransformsContext();
  const transformObj = findTransform(uuid);

  const [amt, setAmt] = useState(1);

  const isMounted = useRef(false);

  const updateAmount = useCallback((val) => {
    if (isMounted.current) {
      setAmt(val);
    }
  }, [isMounted, setAmt]);

  useEffect(() => {
    if (transformObj !== undefined) {
      isMounted.current = true;

      transformObj.subscribe(`${uuid}-amount-updated`, updateAmount);
      setAmt(transformObj.amount);
    }
    return () => {
      isMounted.current = false;
    };
  }, [uuid, transformObj, updateAmount]);

  return (
    <TransformSettingsView
      {...props}
      {...{
        amount: amt,
        setAmount: (val) => {
          if (transformObj !== undefined) {
            transformObj.setAmount(val);
          }
        },
      }}
    />
  );
};

TransformSettings.whyDidYouRender = true;

export default TransformSettings;
