import { useSpring } from '@react-spring/three';

import useRecklessObject from '../@RecklessCore/useRecklessObject';

import DrawCircle from '../shapes/drawCircle';
import DrawEllipse from '../shapes/drawEllipse';

export default function OrbitGenerator({
  type = 'circle',
  resolution = 64,
  radiusW = 1,
  radiusH = 0,
  rpm = 10000,
  loop = true,
  paused = false,
}) {
  const { nodeRef } = useRecklessObject();

  const orbitMili = 60 * 1000 / rpm;

  let points = [];
  switch(type) {
    default:
    case 'circle':
      points = DrawCircle(resolution, radiusW);
      break;
    case 'ellipse':
      points = DrawEllipse(resolution, radiusW, radiusH);
      break;
  }

  useSpring({
    pause: paused,
    loop: loop,
    to: [
      ...points.map((pos)=> { return { position: [pos.x, pos.y, pos.z] }})
    ],
    from: { position: [points[0].x, points[0].y, points[0].z] },
    config: {
      duration:	orbitMili
    },
    onChange: (result) => {
      if (nodeRef.current !== null && result.value !== undefined) {
        nodeRef.current.position.set(...result.value.position);
      }
    }
  });

  return null;
}
