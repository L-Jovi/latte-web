const editor = document.querySelector('#text');
let composing = false;
function offset(node, position) {
  const range = document.createRange();
  range.selectNodeContents(editor);
  range.setEnd(node, position);
  return range.toString().length;
}
function point(position) {
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (position <= node.length) return [node, position];
    position -= node.length;
  }
  return [editor, editor.childNodes.length];
}
function highlight() {
  const selection = getSelection();
  if (
    !selection.rangeCount ||
    !editor.contains(selection.anchorNode) ||
    !editor.contains(selection.focusNode)
  )
    return;
  const anchor = offset(selection.anchorNode, selection.anchorOffset),
    focus = offset(selection.focusNode, selection.focusOffset);
  const text = editor.textContent;
  const fragment = document.createDocumentFragment();
  let start = 0;
  for (const match of text.matchAll(/#[^#\n]{1,6}#/g)) {
    fragment.append(document.createTextNode(text.slice(start, match.index)));
    const mark = document.createElement('mark');
    mark.textContent = match[0];
    fragment.append(mark);
    start = match.index + match[0].length;
  }
  fragment.append(document.createTextNode(text.slice(start)));
  editor.replaceChildren(fragment);
  // DOM replacement invalidates node references; UTF-16 offsets match Range offsets.
  selection.setBaseAndExtent(...point(anchor), ...point(focus));
}
editor.addEventListener('compositionstart', () => (composing = true));
editor.addEventListener('compositionend', () => {
  composing = false;
  highlight();
});
editor.addEventListener('input', (event) => {
  if (!composing && !event.isComposing) highlight();
});
