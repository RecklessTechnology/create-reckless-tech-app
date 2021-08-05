/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import { useCallback, useEffect } from 'react';

import useDeviceContext from '../../../contexts/useDeviceContext';

const MouseDevice = () => {
  const { setPosition } = useDeviceContext();

  const updateMousePosition = useCallback((ev) => {
    setPosition([ev.clientX, ev.clientY, 0]);
  }, [setPosition]);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);

    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [updateMousePosition]);

  return null;
};

MouseDevice.whyDidYouRender = false;

export default MouseDevice;
