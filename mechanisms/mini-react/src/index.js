import React from './react.js';
import { render } from './react-dom.js';
const h = React.createElement;
// The page shows one language at a time (assets/language.js); a counter's
// name is its label in English, and has its own label in Chinese.
const labels = { First: '第一个', Second: '第二个' };
const label = (name) =>
  document.documentElement.dataset.language === 'zh'
    ? `${labels[name]}：`
    : `${name}: `;
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  componentDidMount() {
    // #root starts empty, so this is true only if commit runs after the button is in the page.
    const inPage = document
      .querySelector('#root')
      .textContent.includes(label(this.props.name));
    console.log('mounted after insertion', this.props.name, inPage);
    // An empty update redraws the label after the page switches language.
    document.addEventListener('languagechange', () => this.setState({}));
  }
  render() {
    return h(
      'button',
      { onClick: () => this.setState((state) => ({ count: state.count + 1 })) },
      label(this.props.name) + this.state.count,
    );
  }
}
render(
  h(
    'section',
    {},
    h(Counter, { name: 'First' }),
    h(Counter, { name: 'Second' }),
  ),
  document.querySelector('#root'),
);
