import React from './react.js';
import { render } from './react-dom.js';
const h = React.createElement;
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  componentDidMount() {
    console.log(
      'mounted after insertion',
      this.props.name,
      document.querySelector('#root').isConnected,
    );
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
