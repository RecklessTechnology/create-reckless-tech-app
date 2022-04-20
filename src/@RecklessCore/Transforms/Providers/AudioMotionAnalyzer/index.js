import {
  useRef, useEffect, useState, useCallback,
} from 'react';

import AudioMotionAnalyzer from 'audiomotion-analyzer';

import useAppContext from '../../../App/Contexts/useAppContext';
import useTransformContext from '../../Contexts/useTransformContext';

const AMAnalyzer = ({ connections }) => {
  const {
    uuid,
  } = useTransformContext();
  const {
    subscribe, unsubscribe,
    publish,
  } = useAppContext();

  const [audio, setAudio] = useState();
  const [freqs, setFreqs] = useState([]);

  const analyzerRef = useRef();
  const freqDataRef = useRef();

  const audioRef = useRef();

  const updateFreqData = useCallback((instance) => {
    if (audioRef.current) {
      if (!audioRef.current.paused) {
        if (!freqDataRef.current) {
          freqDataRef.current = new Array(instance.getBars().length);
        }

        const bars = [];
        for (let i = 0; i < instance.getBars().length; i += 1) {
          // Scale to 256
          bars[i] = Math.floor(instance.getBars()[i].value[0] * 255);
        }
        setFreqs(bars);
      }
    }
  }, [freqDataRef]);

  useEffect(() => {
    if (audio !== undefined && analyzerRef.current === undefined) {
      analyzerRef.current = new AudioMotionAnalyzer(null, {
        fftSize: 1024,
        source: audio,
        mode: 0,
        useCanvas: false,
        onCanvasDraw: updateFreqData,
      });
      analyzerRef.current.volume = 1;
    }
  }, [audio, analyzerRef, updateFreqData]);

  useEffect(() => { publish(`${uuid}-freqs-updated`, freqs); }, [uuid, freqs, publish]);

  // Inputs
  useEffect(() => {
    const updateFromInput = (prop, val) => {
      switch (prop.toLowerCase()) {
        default:
          // eslint-disable-next-line no-console
          console.log(`Unknown Prop Sent to AMAnalyzer: ${prop}`);
          break;
        case 'audio':
          setAudio(val);
          audioRef.current = val;
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

AMAnalyzer.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default AMAnalyzer;
