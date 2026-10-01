// The page shows one language at a time (assets/language.js).
export function greeting(name) {
  return document.documentElement.dataset.language === 'zh'
    ? '欢迎 ' + name
    : 'welcome ' + name;
}
