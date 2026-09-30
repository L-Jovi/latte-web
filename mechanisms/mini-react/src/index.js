import React from './react.js';
import { render } from './react-dom.js';
const h = React.createElement;
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  componentDidMount() {
    // #root starts empty, so this is true only if commit runs after the button is in the page.
    const inPage = document
      .querySelector('#root')
      .textContent.includes(this.props.name + ':');
    console.log('mounted after insertion', this.props.name, inPage);
  }
  render() {
    return h(
      'button',
      { onClick: () => this.setState((state) => ({ count: state.count + 1 })) },
      this.props.name + ': ' + this.state.count,
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
