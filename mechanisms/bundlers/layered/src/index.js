import { greeting } from './greeting.js';

const script = document.currentScript;
document.write(greeting('Jovi'));
// document.write cannot run again once the page has loaded, so a language
// switch rewrites the text it wrote, which follows this script.
document.addEventListener('languagechange', () => {
  script.nextSibling.data = greeting('Jovi');
});
