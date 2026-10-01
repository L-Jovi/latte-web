import _ from 'lodash';

// The page shows one language at a time (assets/language.js).
const label = () =>
  document.documentElement.dataset.language === 'zh'
    ? '点我，然后看看控制台！'
    : 'Click me and look at the console!';

function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');
  const br = document.createElement('br');

  button.innerHTML = label();
  // Write the label again when the reader switches the language.
  document.addEventListener('languagechange', () => {
    button.innerHTML = label();
  });
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);

  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  button.onclick = (e) =>
    import(/* webpackChunkName: "print" */ './print.js').then((module) => {
      const print = module.default;
      print();
    });

  return element;
}

document.body.appendChild(component());
