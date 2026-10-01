export function sayHello(name: string) {
  // The page shows one language at a time (assets/language.js).
  return document.documentElement.dataset.language === 'zh'
    ? `${name}向你问好`
    : `Hello from ${name}`;
}
