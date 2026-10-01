import { sayHello } from './greet.js';
const element = document.querySelector('#greeting');
// The name in the page's language; the heading is written again when the
// reader switches the language (assets/language.js).
const greet = () => {
  if (element)
    element.textContent = sayHello(
      document.documentElement.dataset.language === 'zh'
        ? '经 Gulp 构建的 TypeScript 模块'
        : 'TypeScript modules via Gulp',
    );
};
greet();
document.addEventListener('languagechange', greet);
