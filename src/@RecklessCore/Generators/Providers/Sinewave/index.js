import PropTypes from 'prop-types';

import {
  useState, useMemo, useCallback, useEffect,
} from 'react';

import { useSpring } from '@react-spring/core';
import useGeneratorContext from '../../Contexts/useGeneratorContext';

import DrawSine from '../../../Shapes/drawSine';
import { rpmToMili } from '../../../Utils/commonMath';

const SinewaveGenerator = ({ toProp }) => {
  const {
    type, resolution, rpm, looped, paused, setPosition: setGenPosition,
  } = useGeneratorContext();
  const [animMili, setAnimMili] = useState(rpmToMili(rpm, resolution));

  useEffect(() => {
    setAnimMili(rpmToMili(rpm, resolution));
  }, [rpm, resolution]);

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

SinewaveGenerator.propTypes = {
  toProp: PropTypes.string.isRequired,
};

SinewaveGenerator.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default SinewaveGenerator;
