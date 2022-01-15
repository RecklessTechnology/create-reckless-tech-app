import PropTypes from 'prop-types';

import React, {
  useRef, useCallback, useEffect, useState,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';

import useTransformsContext from '../../Contexts/useTransformsContext';

import TransformSettingsView from './view';

const TransformSettings = ({
  uuid, propName,
  // eslint-disable-next-line react/prop-types
  defaultVal,
  ...props
}) => {
  const { subscribe, unsubscribe } = useAppContext();
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

      subscribe(`${uuid}-${propName}-updated`, updateValue);
      setVal(transformObj[propName]);
    }
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-${propName}-updated`, updateValue);
    };
  }, [subscribe, unsubscribe, uuid, transformObj, updateValue, propName]);

  return (
    <TransformSettingsView
      {
        ...{
          uuid,
          propName,
          defaultVal,
        }
      }
      {...props}
      {...{
        value: typeof val === 'string' ? val.toLowerCase() : val,
        setValue: (v) => {
          if (transformObj !== undefined) {
            transformObj[`set${propName.replace(/^\w/, (c) => c.toUpperCase())}`](v);
          }
        },
      }}
    />
  );
};

TransformSettings.whyDidYouRender = (process.env.NODE_ENV === 'development');

TransformSettings.propTypes = {
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};

export default TransformSettings;
