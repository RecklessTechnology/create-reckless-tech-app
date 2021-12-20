import { useCallback, useEffect } from 'react';

import useDeviceContext from '../../Contexts/useDeviceContext';

const MouseDevice = () => {
  const { setPosition } = useDeviceContext();

  const updateMousePosition = useCallback((ev) => {
    setPosition([ev.clientX, ev.clientY, 0]);
  }, [setPosition]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.addEventListener('mousemove', updateMousePosition);

    // eslint-disable-next-line no-undef
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [updateMousePosition]);

  return null;
};

MouseDevice.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default MouseDevice;
