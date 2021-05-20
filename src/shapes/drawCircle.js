import * as THREE from 'three';

export default function DrawCircle(resolution, diameter) {
  let points = [];
  for(let i = 0; i <= 360; i+=(360/resolution)){
    points.push(new THREE.Vector3(
      Math.sin(i*(Math.PI/180))*diameter, Math.cos(i*(Math.PI/180))*diameter, 0)
    );
  }
  return points;
}