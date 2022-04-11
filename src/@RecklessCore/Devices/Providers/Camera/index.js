import {
  useEffect, useRef, useState, useCallback,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';

import useDeviceContext from '../../Contexts/useDeviceContext';

const CameraDevice = ({ uuid }) => {
  const { subscribe, unsubscribe } = useAppContext();
  const {
    selectedDevice,
    mediaStream, setMediaStream,
    deviceList, setDeviceList,
  } = useDeviceContext();

  const isMounted = useRef(false);

  const [selected, setSelected] = useState(selectedDevice);

  const updateSelected = useCallback((val) => {
    if (isMounted.current) {
      setSelected(val);
    }
  }, [isMounted, setSelected]);

  useEffect(() => {
    isMounted.current = true;

    setSelected(selectedDevice);
    subscribe(`${uuid}-selected-device-updated`, updateSelected);

    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-selected-device-updated`, updateSelected);
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [mediaStream, selectedDevice, subscribe, unsubscribe, updateSelected, uuid]);

  // eslint-disable-next-line no-undef
  const initCamera = async (config) => navigator.mediaDevices.getUserMedia(config);

  // eslint-disable-next-line no-undef
  const getCameras = async () => navigator
    .mediaDevices.enumerateDevices();

  useEffect(() => {
    getCameras()
      .then((devices) => {
        setDeviceList(devices.filter((device) => device.kind === 'videoinput'));
        if (selected.deviceId === undefined) {
          setSelected(devices.filter((device) => device.kind === 'videoinput')[0]);
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  }, [setDeviceList, selected]);

  useEffect(() => {
    if (deviceList.filter((device) => device.kind === 'videoinput').length > 0) {
      initCamera({
        audio: false,
        video: {
          deviceId: {
            exact: (selected === undefined)
              ? deviceList.filter((device) => device.kind === 'videoinput')[0].deviceId
              : selected.deviceId,
          },
        },
      })
        .then((s) => {
          setMediaStream(s);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMediaStream, selected]);

  // stop camera if component is unmounted
  useEffect(() => {
    const stream = mediaStream;
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  return null;
};

CameraDevice.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default CameraDevice;
