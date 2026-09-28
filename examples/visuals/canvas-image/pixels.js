export function filterPixels(source, width, height, mode) {
  const result = new Uint8ClampedArray(source);
  if (mode === 'mosaic') {
    for (let y = 0; y < height; y += 12)
      for (let x = 0; x < width; x += 12) {
        const right = Math.min(width, x + 12),
          bottom = Math.min(height, y + 12),
          mean = [0, 0, 0];
        for (let yy = y; yy < bottom; yy++)
          for (let xx = x; xx < right; xx++)
            for (let c = 0; c < 3; c++)
              mean[c] +=
                source[(yy * width + xx) * 4 + c] /
                ((right - x) * (bottom - y));
        for (let yy = y; yy < bottom; yy++)
          for (let xx = x; xx < right; xx++)
            for (let c = 0; c < 3; c++)
              result[(yy * width + xx) * 4 + c] = mean[c];
      }
  } else if (mode === 'blur') {
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) {
        const left = Math.max(0, x - 1);
        const top = Math.max(0, y - 1);
        const right = Math.min(width, x + 2);
        const bottom = Math.min(height, y + 2);
        // Read the immutable source, not pixels already filtered in this pass.
        for (let channel = 0; channel < 3; channel++) {
          let sum = 0;
          for (let yy = top; yy < bottom; yy++)
            for (let xx = left; xx < right; xx++)
              sum += source[(yy * width + xx) * 4 + channel];
          result[(y * width + x) * 4 + channel] =
            sum / ((right - left) * (bottom - top));
        }
      }
  } else
    for (let i = 0; i < result.length; i += 4) {
      const grey =
        source[i] * 0.3 + source[i + 1] * 0.59 + source[i + 2] * 0.11;
      for (let c = 0; c < 3; c++)
        result[i + c] =
          mode === 'grey'
            ? grey
            : mode === 'threshold'
              ? grey > 125
                ? 255
                : 0
              : mode === 'invert'
                ? 255 - source[i + c]
                : source[i + c];
    }
  return result;
}
export function procedural(width, height) {
  const result = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const angle = Math.atan2(y - height / 2, x - width / 2) / 2;
      for (let c = 0; c < 3; c++)
        result[(y * width + x) * 4 + c] =
          Math.cos(angle + (c * Math.PI * 2) / 3) ** 2 * 255;
      result[(y * width + x) * 4 + 3] = 255;
    }
  return result;
}
