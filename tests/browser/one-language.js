// Runs in the page: what a reader would see or hear in the wrong language.
// In Chinese, that is three English words in a row outside code, sample
// output and lang="en" (English names inside Chinese text carry lang="en").
// In English, it is any Chinese at all, apart from the switch naming its
// language: these pages study no Chinese text. (espresso-algorithm, whose
// pages do, lets Chinese marked lang="zh-…" through; here that would hide
// untranslated copy, so a Chinese sample would need data-subject as well.)
// The elements of the other language must be hidden, and <html> must name
// the language.
export function wrongLanguage(expected) {
  const root = document.documentElement;
  const zh = expected === 'zh';
  const problems = [];
  if (
    root.dataset.language !== expected ||
    root.lang !== (zh ? 'zh-Hans' : 'en')
  )
    problems.push(`<html> says ${root.dataset.language}, lang=${root.lang}`);
  // Chinese is CJK ideographs and punctuation, and full-width forms. The range
  // is written in escapes: Unicode normalisation turns U+F900 into U+8C48, and
  // that range would take in the surrogate halves of every emoji.
  const misplaced = zh
    ? /[A-Za-z]{2,}(?:[\s,'’]+[A-Za-z]{2,}){2,}/
    : /[\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]/;
  const lang = (element) =>
    element.closest('[lang]')?.getAttribute('lang') ?? '';
  const allowed = (element) =>
    zh
      ? lang(element).startsWith('en') ||
        element.closest('code, kbd, pre, samp') !== null
      : element.closest('[data-language-switch]') !== null ||
        (element.closest('[data-subject]') !== null &&
          lang(element).startsWith('zh'));
  // A closed <select> draws no box for its options; they show when it does.
  const shown = (element) =>
    (element.closest('select') ?? element).checkVisibility();
  const check = (text, element) => {
    if (misplaced.test(text) && !allowed(element))
      problems.push(text.trim().replace(/\s+/g, ' ').slice(0, 80));
  };
  check(document.title, root);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode())
    if (
      node.parentElement.closest('script, style') === null &&
      shown(node.parentElement)
    )
      check(node.data, node.parentElement);
  for (const element of document.querySelectorAll('[aria-label]'))
    if (shown(element)) check(element.getAttribute('aria-label'), element);
  for (const element of document.querySelectorAll(
    zh ? '[data-l="en"]' : '[data-l="zh"]',
  ))
    if (shown(element))
      problems.push(`shows ${element.outerHTML.slice(0, 80)}`);
  return problems;
}
