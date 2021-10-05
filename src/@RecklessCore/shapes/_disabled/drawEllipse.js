import * as THREE from 'three';

export default function DrawEllipse(resolution, width, height) {
  const points = [];
  const curve = new THREE.EllipseCurve(
    0, 0,
    width, height,
    0, 2 * Math.PI,
    true,
    0,
  );

  const p2 = curve.getPoints(resolution);
  for (let j = 0; j < p2.length; j++) {
    points.push([p2[j].x, p2[j].y]);
  }
  return points;
}