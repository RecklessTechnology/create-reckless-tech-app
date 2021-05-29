import { useState, useMemo } from 'react';

import { useSpring } from '@react-spring/three';

import useRecklessObject from '../@RecklessCore/useRecklessObject';

import DrawCircle from '../shapes/drawCircle';
import DrawEllipse from '../shapes/drawEllipse';

export default function OrbitGenerator({
  type = 'circle',
  resolution = 64,
  radiusW = 0.25,
  radiusH = 0,
  rpm = 500,
  loop = true,
  paused = false,
}) {
  const { nodeRef } = useRecklessObject();
  const [ animMili ] = useState(60 * 1000 / rpm);

  const points = useMemo(()=>{
    switch(type) {
      default:
      case 'circle':
        return DrawCircle(resolution, radiusW);
      case 'ellipse':
        return DrawEllipse(resolution, radiusW, radiusH);
    }
  }, [type, resolution, radiusH, radiusW]);

  const fromPoint = useMemo(()=>{
    if (nodeRef.current !== null) {
      return nodeRef.current.position
    }
  }, [nodeRef]);
  const toPoints = useMemo(()=>[
    ...points.map((pos)=> { return { position: [pos.x, pos.y, pos.z] }})
  ], [points]);

  const config = useMemo(()=>({
    pause: paused,
    loop: loop,
    from: fromPoint,
    to: toPoints,
    config: {
      duration:	animMili,
      friction: 5
    },
    onChange: (result) => {
      if (nodeRef.current !== null && result.value !== undefined) {
        nodeRef.current.position.set(...result.value.position);
      }
    },
  }), [fromPoint, toPoints, animMili, nodeRef, paused, loop]);

  useSpring(config);

  return null;
}
