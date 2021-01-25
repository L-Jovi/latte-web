const sum = (array: number[]): number => {
  let s: number = 0;
  for (let i in array) {
    s += array[i];
  }
  return s;
}

export default sum;
