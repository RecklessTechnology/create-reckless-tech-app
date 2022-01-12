import { useCallback, useEffect } from 'react';

import useDeviceContext from '../../Contexts/useDeviceContext';

const KeyboardDevice = () => {
  const { setPosition } = useDeviceContext();

  const updateKeyboardPosition = useCallback((ev) => {
    setPosition([ev.clientX, ev.clientY, 0]);
  }, [setPosition]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.addEventListener('mousemove', updateKeyboardPosition);

    // eslint-disable-next-line no-undef
    return () => window.removeEventListener('mousemove', updateKeyboardPosition);
  }, [updateKeyboardPosition]);

  return null;
};

KeyboardDevice.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default KeyboardDevice;
