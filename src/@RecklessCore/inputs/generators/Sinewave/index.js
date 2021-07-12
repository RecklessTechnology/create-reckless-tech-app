import { useState, useMemo, useCallback, useEffect } from 'react';

import useGeneratorContext from '../../../contexts/useGeneratorContext';

import DrawSine from '../../../shapes/drawSine';

import { useSpring } from '@react-spring/core';

const SinewaveGenerator = ({ toProp }) => {
  const { type, resolution, rpm, loop, paused, setPosition: setGenPosition } = useGeneratorContext();
  const [ animMili ] = useState((60 * 1000 / rpm) / (360 / resolution));
  
  const points = useMemo(()=>{
    switch(type) {
      default:
      case 'sine':
        return DrawSine(resolution);
    }
  }, [type, resolution]);

  const toPoints = useMemo(()=>{
    return [
      ...points.map((pos)=> {
        return { [toProp]: [pos[0], pos[1], 0] }
      })
    ]
  }, [points, toProp]);

  const handleChange = useCallback((result) => {
    if (result.value !== undefined) {
      setGenPosition(result.value[toProp]);
    }
  }, [toProp, setGenPosition]);

  const config = useMemo(()=>({
    pause: paused,
    loop: loop,
    to: toPoints,
    config: {
      duration:	animMili,
      friction: 5
    },
    onChange: handleChange,
  }), [toPoints, animMili, paused, loop, handleChange]);

  const [, api] = useSpring(()=>(config))
  useEffect(()=>{
    api.stop();
    api.start(config);
  }, [api, config]);

  return null;
}

SinewaveGenerator.whyDidYouRender = false;

export default SinewaveGenerator;