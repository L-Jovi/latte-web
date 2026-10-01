import _ from 'lodash';
import printMe from './print.js';

// The page shows one language at a time (assets/language.js).
const label = () =>
  document.documentElement.dataset.language === 'zh'
    ? '点我，然后查看控制台！'
    : 'Click me and check the console!';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = label();
  btn.onclick = printMe;
  // Write the label again when the reader switches the language.
  document.addEventListener('languagechange', () => {
    btn.innerHTML = label();
  });

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
