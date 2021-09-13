/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, {
  useRef, useCallback, useEffect, useState,
} from 'react';

import useGeneratorsContext from '../../../../contexts/useGeneratorsContext';
import PlaybackToolbarView from '../../shared/PlaybackToolbar/view';

const PlaybackToolbar = ({ uuid }) => {
  const { findGenerator } = useGeneratorsContext();
  const generatorObj = findGenerator(uuid);

  const [isPaused, setIsPaused] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  const isMounted = useRef(false);

  const updatePause = useCallback((val) => {
    if (isMounted.current) {
      setIsPaused(val);
    }
  }, [isMounted, setIsPaused]);

  const updateLoop = useCallback((val) => {
    if (isMounted.current) {
      setIsLooped(val);
    }
  }, [isMounted, setIsLooped]);

  useEffect(() => {
    if (generatorObj !== undefined) {
      isMounted.current = true;

      generatorObj.subscribe(`${uuid}-paused-updated`, updatePause);
      setIsPaused(generatorObj.paused);

      generatorObj.subscribe(`${uuid}-looped-updated`, updateLoop);
      setIsLooped(generatorObj.looped);
    }
    return () => {
      isMounted.current = false;
    };
  }, [uuid, generatorObj, updatePause, updateLoop]);

  return (
    <PlaybackToolbarView {...{
      paused: isPaused,
      looped: isLooped,
      setPause: (val) => {
        if (generatorObj !== undefined) {
          generatorObj.setPaused(val);
        }
      },
      setLoop: (val) => {
        if (generatorObj !== undefined) {
          generatorObj.setLooped(val);
        }
      },
    }}
    />
  );
};

PlaybackToolbar.whyDidYouRender = true;

export default PlaybackToolbar;
