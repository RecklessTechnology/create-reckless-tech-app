import { useCallback, useEffect } from 'react';

import useDeviceContext from '../../Contexts/useDeviceContext';

const AccelDevice = () => {
  const { setPosition } = useDeviceContext();

  const updateAccelPosition = useCallback((ev) => {
    setPosition([ev.clientX, ev.clientY, 0]);
  }, [setPosition]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.addEventListener('mousemove', updateAccelPosition);

    // eslint-disable-next-line no-undef
    return () => window.removeEventListener('mousemove', updateAccelPosition);
  }, [updateAccelPosition]);

  return null;
};

AccelDevice.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default AccelDevice;
