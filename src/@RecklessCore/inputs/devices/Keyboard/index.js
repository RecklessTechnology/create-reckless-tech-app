/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import {
  useState, useMemo, useCallback, useEffect,
} from 'react';

import { useSpring } from '@react-spring/core';
import useGeneratorContext from '../../../contexts/useGeneratorContext';

import DrawSine from '../../../shapes/drawSine';

const KeyboardDevice = ({ toProp }) => {
  const {
    type, resolution, rpm, looped, paused, setPosition: setGenPosition,
  } = useGeneratorContext();
  const [animMili] = useState(((60 * 1000) / rpm) / (360 / resolution));

  const points = useMemo(() => {
    switch (type) {
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

KeyboardDevice.whyDidYouRender = true;

KeyboardDevice.propTypes = {
  toProp: PropTypes.string.isRequired,
};

export default KeyboardDevice;
