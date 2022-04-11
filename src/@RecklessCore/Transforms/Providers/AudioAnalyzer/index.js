import { useRef, useEffect, useState } from 'react';

import AudioMotionAnalyzer from 'audiomotion-analyzer';

import useAppContext from '../../../App/Contexts/useAppContext';
import useTransformContext from '../../Contexts/useTransformContext';

const AudioAnalyzer = () => {
  const {
    uuid,
  } = useTransformContext();
  const {
    sceneJSON, subscribe, unsubscribe, publish,
  } = useAppContext();

  const { connections } = sceneJSON;

  const [audio, setAudio] = useState();
  const [freqs, setFreqs] = useState();

  const analyzerRef = useRef();
  const freqDataRef = useRef();

  useEffect(() => {
    const updateFreqData = (instance) => {
      if (!freqDataRef.current) {
        freqDataRef.current = new Array(instance.getBars().length);
      }

      const bars = [];
      for (let i = 0; i < instance.getBars().length; i += 1) {
        // eslint-disable-next-line no-undef
        // eslint-disable-next-line prefer-destructuring
        bars[i] = instance.getBars()[i].value[0];
      }
      setFreqs(bars);
    };

    analyzerRef.current = new AudioMotionAnalyzer(null, {
      source: audio,
      mode: 2,
      useCanvas: false, // don't use the canvas
      onCanvasDraw: updateFreqData,
    });
    analyzerRef.current.volume = 1;
  }, [audio, analyzerRef]);

  useEffect(() => { publish(`${uuid}-freqs-updated`, freqs); }, [uuid, freqs, publish]);

  // Inputs
  useEffect(() => {
    const updateFromInput = (prop, val) => {
      switch (prop.toLowerCase()) {
        default:
          break;
        case 'audio':
          setAudio(val);
          break;
      }
    };

    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
    });

    return () => {
      connections.filter((c) => (c.to === uuid)).forEach((c) => {
        unsubscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
      });
    };
  }, [connections, uuid, subscribe, unsubscribe]);

  return null;
};

AudioAnalyzer.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default AudioAnalyzer;
