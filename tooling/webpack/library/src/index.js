import values from './ref.json';
export function numToWord(number) {
  return values.find((value) => value.num === number)?.word ?? '';
}
export function wordToNum(word) {
  return (
    values.find(
      (value) => value.word.toLowerCase() === String(word).toLowerCase(),
    )?.num ?? -1
  );
}
