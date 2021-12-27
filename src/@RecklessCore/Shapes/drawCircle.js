export default function DrawCircle(resolution) {
  const diameter = 1;
  const points = [];
  for (let i = 0; i <= 360; i += (360 / resolution)) {
    points.push([
      Math.sin(i * (Math.PI / 180)) * diameter,
      Math.cos(i * (Math.PI / 180)) * diameter,
    ]);
  }
  return points;
}
