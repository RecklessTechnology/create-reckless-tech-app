import { useState, useMemo, useCallback, useEffect } from 'react';

import useThreeObjectContext from '../../../contexts/useThreeObjectContext';
import useGeneratorContext from '../../../contexts/useGeneratorContext';

import DrawCircle from '../../../shapes/drawCircle';

import { useSpring } from '@react-spring/core';

const OrbitGenerator = ({ toProp }) => {
  const { type, resolution, rpm, loop, paused, setPosition: setGenPosition } = useGeneratorContext();
  const { setPosition: setObjPosition, setRotation: setObjRotation } = useThreeObjectContext();  
  const [ animMili ] = useState((60 * 1000 / rpm) / (360 / resolution));
  
  const points = useMemo(()=>{
    switch(type) {
      default:
      case 'sine':
        return DrawCircle(resolution);
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
      switch (toProp) {
        default:
          console.log('prop not found', toProp);
          break;
        case 'position':
          setObjPosition(result.value[toProp]);
          break;
        case 'rotation':
          setObjRotation(result.value[toProp]);
          break;
      }
      setGenPosition(result.value[toProp]);
    }
  }, [toProp, setGenPosition, setObjPosition, setObjRotation]);

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

OrbitGenerator.whyDidYouRender = false;

export default OrbitGenerator;