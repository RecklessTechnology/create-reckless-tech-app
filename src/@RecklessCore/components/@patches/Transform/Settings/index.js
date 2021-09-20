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
  const [oper, setOper] = useState('Multiply');

  const isMounted = useRef(false);

  const updateAmount = useCallback((val) => {
    if (isMounted.current) {
      setAmt(val);
    }
  }, [isMounted, setAmt]);

  const updateOperation = useCallback((val) => {
    if (isMounted.current) {
      setOper(val);
    }
  }, [isMounted, setOper]);

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

  useEffect(() => {
    if (transformObj !== undefined) {
      isMounted.current = true;

      transformObj.subscribe(`${uuid}-operation-updated`, updateOperation);
      setOper(transformObj.operation);
    }
    return () => {
      isMounted.current = false;
    };
  }, [uuid, transformObj, updateOperation]);

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
        operation: oper,
        setOperation: (val) => {
          if (transformObj !== undefined) {
            transformObj.setOperation(val);
          }
        },
      }}
    />
  );
};

TransformSettings.whyDidYouRender = true;

export default TransformSettings;
