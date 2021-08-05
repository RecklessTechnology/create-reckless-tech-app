import { useEffect, useRef } from 'react';
import useAppContext from './useAppContext';

export default function useAppEvent(
  eventName,
  callback,
  deps = [],
) {
  const callbackRef = useRef();
  const { subscribe } = useAppContext();

  callbackRef.current = callback;

  useEffect(() => subscribe(eventName, callbackRef.current),
  // eslint-disable-next-line react-hooks/exhaustive-deps
    [subscribe, eventName, ...deps]);
}
