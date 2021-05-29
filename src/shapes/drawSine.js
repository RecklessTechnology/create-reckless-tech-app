import * as THREE from 'three';

export default function DrawSine(resolution, diameter) {
  let points = [];
  for(let i = 0; i <= 360; i+=(360/resolution)){
    points.push(new THREE.Vector3(
      0,// Math.sin(i*(Math.PI/180))*diameter,
      Math.sin(i*(Math.PI/180))*diameter,
      0
    ));
  }
  return points;
}