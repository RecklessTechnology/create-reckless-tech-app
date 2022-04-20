/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';

import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';
import useTransformsContext from '../../Contexts/useTransformsContext';

import WidgetChrome from '../../../Widgets/Components/WidgetChrome';
import AudioVisualizerView from './view';
import useWidgetsContext from '../../../Widgets/Contexts/useWidgetsContext';

const AudioVisualizer = ({
  connections,
  uuid,
  ...props
}) => {
  const { subscribe, unsubscribe } = useAppContext();
  const { findTransform } = useTransformsContext();
  const { findWidget } = useWidgetsContext();

  const isMounted = useRef(false);

  const [from, setFrom] = useState();
  const [transformObj, setTransformObj] = useState();
  const widgetObj = findWidget(uuid);

  const [widget, setWidget] = useState();

  const [windowSize, setWindowSize] = useState(1);
  const [windowLocation, setWindowLocation] = useState(0);

  const [transform, setTransform] = useState();
  const [freqs, setFreqs] = useState([]);

  const updateProp = useCallback((val, prop) => {
    if (isMounted.current) {
      switch (prop.toLowerCase()) {
        default:
          // eslint-disable-next-line no-console
          console.log(`Unknown Prop Sent to AudioVisualizer: ${prop}`);
          break;
        case 'size':
          setWindowSize(val);
          break;
        case 'location':
          setWindowLocation(val);
          break;
        case 'freqs':
          setFreqs(val);
          break;
      }
    }
  }, [isMounted]);

  useEffect(() => {
    isMounted.current = true;
    subscribe(`${uuid}-location-updated`, (val) => updateProp(val, 'location'));
    subscribe(`${uuid}-size-updated`, (val) => updateProp(val, 'size'));
    subscribe(`${from}-freqs-updated`, (val) => updateProp(val, 'freqs'));
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-location-updated`, (val) => updateProp(val, 'location'));
      unsubscribe(`${uuid}-size-updated`, (val) => updateProp(val, 'size'));
      unsubscribe(`${from}-freqs-updated`, (val) => updateProp(val, 'freqs'));
    };
  }, [from, subscribe, unsubscribe, updateProp, uuid]);

  useEffect(() => {
    if (connections !== undefined) {
      const conns = connections.filter((c) => (c.to === uuid));
      if (conns.length > 0) {
        const { from: f } = conns[0];
        setFrom(f);
        setTransformObj(findTransform(f));
      }
    }
  }, [connections, setTransformObj, findTransform, uuid, from]);

  useEffect(() => {
    if (transformObj !== undefined) {
      setTransform(transformObj);
    }
    return () => {
    };
  }, [from, transformObj]);

  useEffect(() => {
    if (widgetObj !== undefined) {
      setWidget(widgetObj);
    }
    return () => {
    };
  }, [uuid, transformObj, widgetObj]);

  const changeSize = useCallback((val) => {
    if (widget !== undefined) {
      widget.setSize(val);
    }
  }, [widget]);

  const changeLocation = useCallback((val) => {
    if (widget !== undefined) {
      widget.setLocation(val);
    }
  }, [widget]);

  if (widget === null || transform === null) return null;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <WidgetChrome
      size={windowSize}
      changeSize={changeSize}
      location={windowLocation}
      changeLocation={changeLocation}
    >
      <AudioVisualizerView
        {...props}
        freqs={freqs}
      />
    </WidgetChrome>
  );
};

AudioVisualizer.propTypes = {
  uuid: PropTypes.string.isRequired,
  connections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default AudioVisualizer;
