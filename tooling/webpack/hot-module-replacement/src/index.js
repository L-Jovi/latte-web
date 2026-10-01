import _ from 'lodash';
import printMe from './print.js';
import './styles.css';

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
  element.appendChild(btn);

  return element;
}

let element = component();
document.body.appendChild(element);
// Write the label again when the reader switches the language. The listener
// sits out here, so it always finds the current element after a hot update.
document.addEventListener('languagechange', () => {
  element.querySelector('button').innerHTML = label();
});

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}
