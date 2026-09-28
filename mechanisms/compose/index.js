export function forgeCompose(...functions) {
  if (functions.length === 0) return (value) => value;
  return functions.reduce(
    (outer, inner) =>
      (...args) =>
        outer(inner(...args)),
  );
}
