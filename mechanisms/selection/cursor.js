const editor = document.querySelector('#edit');
// Keep HTML indentation out of the text nodes used by Range offsets.
editor.textContent = 'Hello world';
let saved;
function remember() {
  const selection = getSelection();
  if (
    selection.rangeCount &&
    editor.contains(selection.anchorNode) &&
    editor.contains(selection.focusNode)
  )
    saved = selection.getRangeAt(0).cloneRange();
}
editor.addEventListener('keyup', remember);
editor.addEventListener('pointerup', remember);
editor.addEventListener('input', remember);
document.querySelector('#sendEmoji').addEventListener('click', () => {
  editor.focus();
  const selection = getSelection();
  const range =
    saved && editor.contains(saved.commonAncestorContainer)
      ? saved
      : document.createRange();
  if (range !== saved) {
    range.selectNodeContents(editor);
    range.collapse(false);
  }
  range.deleteContents();
  const text = document.createTextNode(
    document.querySelector('#emojiInput').value,
  );
  range.insertNode(text);
  range.setStartAfter(text);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  saved = range.cloneRange();
});
