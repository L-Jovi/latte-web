export function slots(count, current) {
  return Array.from({ length: count }, (_, i) => {
    let distance = (i - current + count) % count;
    if (distance > count / 2) distance -= count;
    const depth = Math.abs(distance);
    return {
      x: distance * 90,
      scale: 0.78 ** depth,
      opacity: 1 / (depth + 1),
      z: count - depth,
    };
  });
}
