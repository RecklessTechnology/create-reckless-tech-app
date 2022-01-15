import PropTypes from 'prop-types';

import React, {
  useRef, useCallback, useEffect, useState,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';

import PlaybackToolbarView from '../../../Components/Patches/PlaybackToolbar/view';

const PlaybackToolbar = ({ uuid }) => {
  const { subscribe, unsubscribe } = useAppContext();

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
    isMounted.current = true;

    subscribe(`${uuid}-paused-updated`, updatePause);
    // setIsPaused(generatorObj.paused);

    subscribe(`${uuid}-looped-updated`, updateLoop);
    // setIsLooped(generatorObj.looped);
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-paused-updated`, updatePause);
      unsubscribe(`${uuid}-looped-updated`, updateLoop);
    };
  }, [uuid, subscribe, unsubscribe, updatePause, updateLoop]);

  return (
    <PlaybackToolbarView {...{
      paused: isPaused,
      looped: isLooped,
      setPause: () => {
        // if (generatorObj !== undefined) {
        //   generatorObj.setPaused(val);
        // }
      },
      setLoop: () => {
        // if (generatorObj !== undefined) {
        //   generatorObj.setLooped(val);
        // }
      },
    }}
    />
  );
};

PlaybackToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

PlaybackToolbar.propTypes = {
  uuid: PropTypes.string.isRequired,
};

export default PlaybackToolbar;
