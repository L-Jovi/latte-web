// The site's language switch. Every page carries its text in English and in
// Chinese, and shows one language at a time: English, unless ?lang=zh or an
// earlier choice asks for Chinese. Static text sits in pairs of elements
// marked data-l="en" and data-l="zh", which site.css hides by language;
// where an element cannot be doubled, such as an <option>, or the text is an
// aria-label, the two versions sit in data-text-en/-zh or data-label-en/-zh.
// Page scripts read data-language on <html> for the text they write, and
// redraw it when document fires "languagechange".
//
// This is a classic script in <head>, not a module, so that the language
// is set before the page is first drawn and nothing flickers.
(() => {
  const KEY = 'latte-language';
  const root = document.documentElement;
  const save = (language) => {
    try {
      localStorage.setItem(KEY, language);
    } catch {
      // Storage can be blocked; the page still switches, and forgets on the next visit.
    }
  };

  const asked = new URLSearchParams(location.search).get('lang');
  let language = 'en';
  if (asked === 'zh' || asked === 'en') {
    // A link that names a language sets it for the pages it leads to as well.
    language = asked;
    save(language);
  } else {
    try {
      // Before the whole site could switch, the guide panel kept its own choice.
      const stored =
        localStorage.getItem(KEY) ?? localStorage.getItem('latte-guide-lang');
      if (stored === 'zh') language = 'zh';
    } catch {
      // Storage can be blocked; English it is.
    }
  }

  function apply() {
    const zh = language === 'zh';
    root.dataset.language = language;
    root.lang = zh ? 'zh-Hans' : 'en';
    const title = zh ? root.dataset.titleZh : root.dataset.titleEn;
    if (title) document.title = title;
    const suffix = zh ? 'Zh' : 'En';
    for (const element of document.querySelectorAll('[data-text-en]'))
      element.textContent = element.dataset[`text${suffix}`];
    for (const element of document.querySelectorAll('[data-label-en]'))
      element.setAttribute('aria-label', element.dataset[`label${suffix}`]);
    // A switch starts hidden, so it never shows without this script, and it
    // names the other language in that language, as language menus do.
    for (const button of document.querySelectorAll('[data-language-switch]')) {
      button.hidden = false;
      button.textContent = zh ? 'English' : '中文';
      button.lang = zh ? 'en' : 'zh-Hans';
      button.setAttribute(
        'aria-label',
        zh ? 'Switch the page to English' : '把页面切换为中文',
      );
    }
  }

  function set(next) {
    if (next !== 'en' && next !== 'zh') return;
    language = next;
    save(language);
    // An address that names the language keeps naming the one shown.
    const url = new URL(location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', language);
      history.replaceState(history.state, '', url);
    }
    apply();
    document.dispatchEvent(
      new CustomEvent('languagechange', { detail: language }),
    );
  }

  // The guide panel and page scripts read and change the language through this.
  window.latteLanguage = {
    get: () => language,
    set,
    toggle: () => set(language === 'zh' ? 'en' : 'zh'),
  };

  apply();
  document.addEventListener('DOMContentLoaded', apply);
  // One listener for every switch, including those a script adds later.
  document.addEventListener('click', (event) => {
    if (event.target.closest?.('[data-language-switch]'))
      window.latteLanguage.toggle();
  });
})();
