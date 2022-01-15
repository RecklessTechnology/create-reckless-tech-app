import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';

import useDevicesContext from '../../../Devices/Contexts/useDevicesContext';

import PreviewWidgetView from './view';

const PreviewWidget = ({ propName, connection, ...props }) => {
  const { from } = connection;
  const { subscribe, unsubscribe } = useAppContext();
  const { findDevice } = useDevicesContext();
  const deviceObj = findDevice(from);
  const [propVal, setPropVal] = useState(null);
  const isMounted = useRef(false);

  const updateProp = useCallback((val) => {
    if (isMounted.current) {
      setPropVal(val);
    }
  }, [isMounted, setPropVal]);

  useEffect(() => {
    if (deviceObj !== undefined) {
      isMounted.current = true;
      subscribe(`${deviceObj.uuid}-${propName}-updated`, updateProp);
    }
    return () => {
      if (deviceObj !== undefined) {
        isMounted.current = false;
        unsubscribe(`${deviceObj.uuid}-${propName}-updated`, updateProp);
      }
    };
  }, [deviceObj, from, propName, subscribe, unsubscribe, updateProp]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <PreviewWidgetView {...{ value: propVal }} {...props} />;
};

PreviewWidget.propTypes = {
  connection: PropTypes.shape({
    from: PropTypes.string,
  }).isRequired,
  propName: PropTypes.string.isRequired,
};

export default PreviewWidget;
