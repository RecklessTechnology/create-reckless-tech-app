import PropTypes from 'prop-types';

import {
  useState, useMemo, useCallback, useEffect,
} from 'react';

import { useSpring } from '@react-spring/core';
import useGeneratorContext from '../../../Generators/Contexts/useGeneratorContext';

import DrawSine from '../../../Shapes/drawSine';

const KeyboardDevice = ({ toProp }) => {
  const {
    type, resolution, rpm, looped, paused, setPosition: setGenPosition,
  } = useGeneratorContext();
  const [animMili] = useState(((60 * 1000) / rpm) / (360 / resolution));

  const points = useMemo(() => {
    switch (type.toLowerCase()) {
      default:
      case 'sine':
        return DrawSine(resolution);
    }
  }, [type, resolution]);

  const toPoints = useMemo(() => [
    ...points.map((pos) => ({ [toProp]: [pos[0], pos[1], 0] })),
  ], [points, toProp]);

  const handleChange = useCallback((result) => {
    if (result.value !== undefined) {
      setGenPosition(result.value[toProp]);
    }
  }, [toProp, setGenPosition]);

  const config = useMemo(() => ({
    pause: paused,
    loop: looped,
    to: toPoints,
    config: {
      duration: animMili,
      friction: 5,
    },
    onChange: handleChange,
  }), [toPoints, animMili, paused, looped, handleChange]);

  const [, api] = useSpring(() => (config));
  useEffect(() => {
    api.stop();
    api.start(config);
  }, [api, config]);

  return null;
};

KeyboardDevice.whyDidYouRender = (process.env.NODE_ENV === 'development');

KeyboardDevice.propTypes = {
  toProp: PropTypes.string.isRequired,
};

export default KeyboardDevice;
