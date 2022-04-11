/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';

import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';
import useDevicesContext from '../../Contexts/useDevicesContext';

import WidgetChrome from '../../../Widgets/Components/WidgetChrome';
import CameraPreviewView from './view';
import useWidgetsContext from '../../../Widgets/Contexts/useWidgetsContext';

const CameraPreview = ({
  connection,
  uuid,
  ...props
}) => {
  const { subscribe, unsubscribe } = useAppContext();
  const { findDevice, mediaStream: previewStream } = useDevicesContext();
  const { findWidget } = useWidgetsContext();

  const isMounted = useRef(false);

  const { from } = connection;
  const deviceObj = findDevice(from);
  const widgetObj = findWidget(uuid);

  const [device, setDevice] = useState();
  const [widget, setWidget] = useState();

  const [windowSize, setWindowSize] = useState(1);
  const [windowLocation, setWindowLocation] = useState(0);

  const [stream, setStream] = useState(previewStream);

  const updateProp = useCallback((val, prop) => {
    if (isMounted.current) {
      switch (prop.toLowerCase()) {
        default:
          break;
        case 'size':
          setWindowSize(val);
          break;
        case 'location':
          setWindowLocation(val);
          break;
        case 'mediastream':
          setStream(val);
          break;
      }
    }
  }, [isMounted]);

  useEffect(() => {
    isMounted.current = true;
    subscribe(`${uuid}-location-updated`, (val) => updateProp(val, 'location'));
    subscribe(`${uuid}-size-updated`, (val) => updateProp(val, 'size'));
    subscribe(`${from}-mediastream-updated`, (val) => updateProp(val, 'mediastream'));
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-location-updated`, (val) => updateProp(val, 'location'));
      unsubscribe(`${uuid}-size-updated`, (val) => updateProp(val, 'size'));
      unsubscribe(`${from}-mediastream-updated`, (val) => updateProp(val, 'mediastream'));
    };
  }, [from, subscribe, unsubscribe, updateProp, uuid]);

  useEffect(() => {
    if (deviceObj !== undefined) {
      setDevice(deviceObj);
    }
    return () => {
    };
  }, [from, deviceObj]);

  useEffect(() => {
    if (widgetObj !== undefined) {
      setWidget(widgetObj);
    }
    return () => {
    };
  }, [uuid, deviceObj, widgetObj]);

  const changeSize = useCallback((val) => {
    if (widget !== undefined) {
      widget.setSize(val);
    }
  }, [widget]);

  const changeLocation = useCallback((val) => {
    if (widget !== undefined) {
      widget.setLocation(val);
    }
  }, [widget]);

  if (widget === null || device === null || stream === undefined) return null;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <WidgetChrome
      size={windowSize}
      changeSize={changeSize}
      location={windowLocation}
      changeLocation={changeLocation}
    >
      <CameraPreviewView {...{ stream }} {...props} />
    </WidgetChrome>
  );
};

CameraPreview.propTypes = {
  uuid: PropTypes.string.isRequired,
  connection: PropTypes.shape({
    to: PropTypes.string,
    from: PropTypes.string,
  }).isRequired,
};

export default CameraPreview;
