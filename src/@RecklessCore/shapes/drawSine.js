export default function DrawSine(resolution) {
  const scale = 1; // Min Max range. X range: [-scale, scale] Y range: [-scale, scale]
  const points = [];
  for (let i = 0; i <= 360; i += (360 / resolution)) {
    points.push([
      (scale / 360) * (i * 2) - scale,
      Math.sin(i * (Math.PI / 180)) * scale,
    ]);
  }
  return points;
}
