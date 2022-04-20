import {
  useRef, useEffect,
  useCallback,
  useState,
} from 'react';

import useAppContext from '../../../App/Contexts/useAppContext';
import useTransformContext from '../../Contexts/useTransformContext';

const NativeAnalyzer = ({ connections }) => {
  const {
    uuid,
  } = useTransformContext();
  const {
    subscribe, unsubscribe,
    publish,
  } = useAppContext();

  const audioRef = useRef();
  const analyserRef = useRef();
  const animationRef = useRef();
  const contextRef = useRef();

  const [
    audio,
    setAudio,
  ] = useState();
  const [
    freqs,
    setFreqs,
  ] = useState([]);

  const animate = useCallback(() => {
    if (audioRef.current !== undefined && analyserRef.current !== undefined) {
      if (!audioRef.current.paused) {
        // check if context is in suspended state (autoplay policy)
        if (contextRef.current.state === 'suspended') {
          contextRef.current.resume();
        }

        const frequencyData = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(frequencyData);
        setFreqs(Array.from(frequencyData));
      }
    }
    // eslint-disable-next-line no-undef
    animationRef.current = requestAnimationFrame(animate);
  }, [audioRef, analyserRef]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    animationRef.current = requestAnimationFrame(animate);
    // eslint-disable-next-line no-undef
    return () => cancelAnimationFrame(animationRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audio !== undefined && analyserRef.current === undefined) {
      const audioCtx = audio.context;
      const track = audioCtx.createMediaElementSource(audio);

      // volume
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;

      // connect our graph
      track.connect(analyser).connect(audioCtx.destination);

      contextRef.current = audioCtx;
      analyserRef.current = analyser;
    }
  }, [audio]);

  useEffect(() => { publish(`${uuid}-freqs-updated`, freqs); }, [uuid, freqs, publish]);

  // Inputs
  useEffect(() => {
    const updateFromInput = (prop, val) => {
      switch (prop.toLowerCase()) {
        default:
          // eslint-disable-next-line no-console
          console.log(`Unknown Prop Sent to NativeAudioAnalyzer: ${prop}`);
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
  }, [connections, uuid, subscribe, unsubscribe, setAudio]);

  return null;
};

NativeAnalyzer.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default NativeAnalyzer;
